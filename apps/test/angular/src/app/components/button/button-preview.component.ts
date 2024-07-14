import { Component } from '@angular/core';
import { HlmButtonModule } from './hlm-button.module';
import {  LoaderIconComponent } from '../../lib/icon/icons';

@Component({
  selector: 'button-preview',
  standalone: true,
  imports: [HlmButtonModule],
  template: `<Button
  hlmBtn
  [variant]="'outline'"
  [size]="'md'"
  [shape]="'rectangle'"
  [isLoading]="true"
  >
  Submit
</Button>`,
})
export class ButtonPreviewComponent {
  LoaderIconComponent = LoaderIconComponent;
  isFormValid = false;
}