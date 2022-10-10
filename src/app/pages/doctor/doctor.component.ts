import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalsService } from '../../services/hospitals.service';
import { HospitalSelect } from '../../../types/hospital';
import { DoctorService } from '../../services/doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorPopulated } from '../../../types/doctor';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  form: FormGroup;
  hospitals: HospitalSelect[] = [];
  hospitalSelected: HospitalSelect | undefined;
  doctor: DoctorPopulated | undefined;

  constructor(private fb: FormBuilder, private hospitalsService: HospitalsService, private doctorService: DoctorService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      hospital: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.loadDoctor(id);
    })
    this.loadHospitalsSelect();
    this.form.valueChanges.subscribe(({ hospital }) => this.hospitalSelected = this.hospitals.find(({ _id }) => _id === hospital) );
  }

  loadHospitalsSelect() {
    this.hospitalsService.getHospitalsSelect().subscribe(res => this.hospitals = res.hospitals);
  }

  loadDoctor(id: string) {
    if (id !== 'nuevo') {
      this.doctorService.getDoctor(id).pipe( delay(50) ).subscribe(res => {
        this.doctor = res.doctor;
        this.form.setValue({ 'name': res.doctor.name, 'hospital': res.doctor.hospital._id })
      })
    }
  }

  onSubmit() {
    if (!this.doctor) {
      this.addDoctor();
    } else {
      this.updateDoctor(this.doctor._id);
    }
  }

  addDoctor() {
    this.doctorService.addDoctor(this.form.value).subscribe(res => {
      Swal.fire('Created', res.doctor.name, 'success');
      this.router.navigateByUrl(`dashboard/doctors/${res.doctor._id}`);
    });
  }

  updateDoctor(id: string) {
    this.doctorService.updateDoctor(id, this.form.value).subscribe(res => {
      Swal.fire('Updated', this.form.get('name')?.value, 'success');
    })
  }

}
