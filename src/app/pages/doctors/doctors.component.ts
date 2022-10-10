import { Component, OnDestroy, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { GetDoctorsResp } from '../../../types/doctor';
import { ModalService } from '../../services/modal.service';
import Swal from 'sweetalert2';
import { SearchesService } from '../../services/searches.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  data: GetDoctorsResp = {
    doctors: [],
    total: 0
  }
  page: number = 0;
  search: string | null = null;
  newImageSub: Subscription = new Subscription();

  constructor(private doctorService: DoctorService, private modalService: ModalService, private searchService: SearchesService) { }

  ngOnInit(): void {
    this.loadDoctors();
    this.newImageSub = this.modalService.newImage.subscribe(image => this.loadDoctors());
  }

  ngOnDestroy(): void {
    this.newImageSub.unsubscribe();
  }

  loadDoctors() {
    this.doctorService.getDoctors(this.page).subscribe(res => {
      this.data = res;
      this.loading = false;
    });
  }

  changePage(change: number) {
    this.page += change;
    if (this.page < 0) {
      this.page = 0;
    } else if (this.page >= this.data.total) {
      this.page -= change;
    }
    this.search ? this.loadSearchDoctors() : this.loadDoctors();
  }

  openModal(id: string, image: string) {
    this.modalService.openModal(id, 'doctors', image);
  }

  deleteDoctor(id: string) {
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
        this.doctorService.deleteDoctor(id).subscribe(res => {
          if (res.deleted) {
            Swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
            )
            this.loadDoctors();
          }
        })
      }
    })
  }

  loadSearchDoctors() {
    if (!this.search) {
      return this.loadDoctors();
    } 
    this.searchService.searchByCollection('doctors', this.page, this.search).subscribe(res => {
      this.data.total = res.total;
      this.data.doctors = res.data;
    })

  }

}
