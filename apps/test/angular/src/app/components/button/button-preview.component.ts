import { Component } from '@angular/core';
import { HlmButtonModule } from './hlm-button.module';

@Component({
  selector: 'app-button-preview',
  template: `<p *ngFor="let user of users">{{user.name}} : {{user.age}}</p>`,
  imports: [HlmButtonModule],
  standalone: true
})
export class ButtonPreviewComponent {
  isFormValid = false;
  variants = [
    "default",
    "secondary",
    "outline",
    "quiet",
    "success",
    "warning",
    "danger",
    "accent",
  ] as const;

}