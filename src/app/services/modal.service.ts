import { EventEmitter, Injectable } from '@angular/core';
import { UploadTypes } from 'src/types/upload';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _toggle: boolean = true;
  id: string = '';
  type: UploadTypes = 'users';
  image: string = '';
  newImage: EventEmitter<string> = new EventEmitter<string>();

  get toggle(): boolean {
    return this._toggle;
  }
  constructor() { }

  openModal(id: string, type: UploadTypes, image: string) {
    this._toggle = false;
    this.id = id  
    this.type = type;
    this.image = image;
  }

  closeModal() {
    this._toggle = true;
  }

}
