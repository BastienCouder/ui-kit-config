import { Component } from '@angular/core';
import { HlmButtonModule } from '@/lib/components/core/default/angular/button/hlm-button.module';

@Component({
  selector: 'button',
  standalone: true,
  imports: [HlmButtonModule],
  template: `
  <div className="flex w-full items-center justify-center gap-2">
    <Button hlmBtn [isLoading]="true" [size]="'sm'" >
      Button
    </Button>
    <Button hlmBtn [isLoading]="true" [size]="'md'" >
      Button
    </Button>
    <Button hlmBtn [isLoading]="true" [size]="'lg'" >
      Button
    </Button>
  </div>  
  `,
})

export class ButtonPreviewComponent {
}