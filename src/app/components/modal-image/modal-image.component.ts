import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {

  file: File | null = null;
  preview: string | ArrayBuffer | null = null;

  constructor(public modalService: ModalService, private uploadService: UploadService) {}

  ngOnInit(): void {
  }

  closeModal() {
    this.preview = null;
    this.modalService.closeModal();
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
      this.uploadService.uploadImage(this.modalService.type, this.modalService.id, this.file).subscribe({
        next: ({ imageUploaded }) => {
          if (imageUploaded) {
            this.modalService.newImage.emit(imageUploaded);
            this.closeModal();
          }
        },
        error: error => console.log(error)
      });
    }
  }


}
