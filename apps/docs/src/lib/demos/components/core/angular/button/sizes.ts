import { Component } from '@angular/core';
import { HlmButtonModule } from '@/lib/components/core/default/angular/button/hlm-button.module';

@Component({
  selector: 'button-preview',
  standalone: true,
  imports: [HlmButtonModule],
  template: `
    <div className="flex w-full items-center justify-center gap-4">
      <Button hlmBtn [size]="'sm'">Button</Button>
      <Button hlmBtn [size]="'md'">Button</Button>
      <Button hlmBtn [size]="'lg'">Button</Button>
    </div>
  `,
})

export class ButtonPreviewComponent {
}