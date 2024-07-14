// icon.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderIconComponent} from './icons';

@NgModule({
  declarations: [
    LoaderIconComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderIconComponent,
  ]
})
export class IconModule {}
