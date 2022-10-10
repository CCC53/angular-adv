import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { DonutComponent } from './donut/donut.component';
import { ModalImageComponent } from './modal-image/modal-image.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    IncrementerComponent,
    DonutComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
    PipesModule
  ],
  exports: [
    IncrementerComponent,
    DonutComponent,
    ModalImageComponent
  ]
})
export class ComponentsModule { }
