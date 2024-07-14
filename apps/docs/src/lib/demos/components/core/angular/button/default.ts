import { Component } from '@angular/core';
import { HlmButtonModule } from '@/lib/components/core/default/angular/button/hlm-button.module';
import { LoaderIconComponent } from '@/lib/components/core/default/angular/lib/icons/icons';

@Component({
  selector: 'button-preview',
  standalone: true,
  imports: [HlmButtonModule],
  template: `<Button hlmBtn>Button</Button>`,
})
export class ButtonPreviewComponent {
  LoaderIconComponent = LoaderIconComponent;
}