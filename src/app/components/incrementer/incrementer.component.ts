import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styleUrls: ['./incrementer.component.css']
})
export class IncrementerComponent implements OnInit {

  @Input() progress: number = 10;
  @Input() btnStyle: string = 'btn-primary';
  @Output() outputValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.btnStyle = `btn ${this.btnStyle}`;
  }

  changeValue(value: number): void {
    if (this.progress <= 0 && value < 0) {
      this.outputValue.emit(0);
      this.progress = 0;
      return;
    }
    if (this.progress >= 100 && value >= 0) {
      this.outputValue.emit(100);
      this.progress = 100;
      return;
    }
    this.progress += value;
    this.outputValue.emit(this.progress);
  }

  onChange(e: number) {
    if (e >= 100) {
      this.progress = 100;
    } else if (e <= 0) {
      this.progress = 0;
    } else {
      this.progress = e;
    }
    this.outputValue.emit(this.progress);
  }

}
