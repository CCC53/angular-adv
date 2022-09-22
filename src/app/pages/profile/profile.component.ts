import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UserService } from '../../services/user.service';
import { UpdateProfileForm } from 'src/types/user';
import { fields } from './profile.component.fields';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form = new FormGroup({});
  fields: FormlyFieldConfig[] = fields;
  model: UpdateProfileForm = { name: this.userService.user.name, email: this.userService.user.email, google: this.userService.user.google } as UpdateProfileForm;
  file: File | null = null;
  currentImage: string;
  preview: string | ArrayBuffer | null = null;

  constructor(private userService: UserService, private uploadService: UploadService) {
    this.currentImage = userService.image;
  }

  ngOnInit(): void {
  }

  onSubmit(model: UpdateProfileForm) {
    this.userService.updateUserProfile(model).subscribe({
      next: res => {
        this.userService.user.name = model.name;
        this.userService.user.email = model.email;
      },
      error: error => console.log(error)
    })
  }

  onChangeFile(event: Event) {
    const inputFile = event.target as HTMLInputElement;
    const file = inputFile.files && inputFile.files[0];
    if (!file) {
      this.preview = null;
      return;
    }
    this.file = file;
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onloadend = () => {
      this.preview = reader.result;
    }
  }

  onSubmitFile() {
    if (this.file) {
      this.uploadService.uploadImage('users', this.userService.id, this.file).subscribe({
        next: ({ imageUploaded }) => {
          if (imageUploaded) {
            this.userService.user.image = imageUploaded;
          }
        },
        error: error => console.log(error)
      });
    }
  }
}
