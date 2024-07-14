import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from './button.component';
import { IconModule } from '../lib/icons/icon.module';


@NgModule({
  declarations: [
    HlmButtonDirective,
  ],
  imports: [
    CommonModule,
    IconModule,
  ],
  exports: [
    HlmButtonDirective,
  ],
})
export class HlmButtonModule {}
