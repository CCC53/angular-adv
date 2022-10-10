import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { HospitalsService } from '../../services/hospitals.service';
import { GetHospitalsResp, HospitalPopulated } from '../../../types/hospital';
import { SearchesService } from '../../services/searches.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit, OnDestroy {

  page: number = 0;
  loading: boolean = true;
  data: GetHospitalsResp = {
    total: 0,
    hospitals: []
  }
  newImageSub: Subscription = new Subscription();
  search: string | null = null;

  constructor(private hospitalsService: HospitalsService, private modalService: ModalService, private searchesService: SearchesService) { }
  
  ngOnInit(): void {
    this.loadHospitals();
    this.newImageSub = this.modalService.newImage.subscribe(image => this.loadHospitals());
  }
  
  ngOnDestroy(): void {
    this.newImageSub.unsubscribe();
  }

  loadHospitals() {
    this.hospitalsService.getHospitals(this.page).subscribe(res => {
      this.data = res;
      this.loading = false;
    })
  }

  changePage(change: number) {
    this.page += change;
    if (this.page < 0) {
      this.page = 0;
    } else if (this.page >= this.data.total) {
      this.page -= change;
    }
    this.search ? this.loadSearchHospitals() : this.loadHospitals();
  }

  updateHospital({ _id, name }: HospitalPopulated) {
    this.hospitalsService.updateHospital(_id, name).subscribe(res => {
      if (res.updated) {
        Swal.fire('Updated', name, 'success');
      }
    })
  }

  deleteHospital(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalsService.deleteHospital(id).subscribe(res => {
          if (res.deleted) {
            Swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
            )
            this.loadHospitals();
          }
        })
      }
    })
  }

  async createHospital() {
    const { value: name } = await Swal.fire<string>({
      showCancelButton: true,
      title: 'Register hospital',
      text: 'Enter hospital name',
      input: 'text',
      inputPlaceholder: 'Hospital name',
      inputValidator: (value) => value ? null : 'This field is required!'
    })
    name && this.hospitalsService.createHospital(name).subscribe(res => res && this.loadHospitals())
  }

  openModal(id: string, image: string) {
    this.modalService.openModal(id, 'hospitals', image);
  }

  loadSearchHospitals() {
    if (!this.search) {
      return this.loadHospitals();
    }
    this.searchesService.searchByCollection('hospitals', this.page, this.search).subscribe(res => {
      this.data.total = res.total;
      this.data.hospitals = res.data;
    });
  }
}
