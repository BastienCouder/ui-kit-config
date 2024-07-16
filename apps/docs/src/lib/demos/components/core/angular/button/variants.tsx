import { Component } from '@angular/core';
import { HlmButtonModule } from '@/lib/components/core/default/angular/button/hlm-button.module';

@Component({
  selector: 'button-preview',
  standalone: true,
  imports: [HlmButtonModule],
  template: `
    <div class="grid grid-cols-4 gap-2">
      <ng-container *ngFor="let variant of variants">
        <hlm-button [variant]="variant">
          {{ variant }}
        </hlm-button>
      </ng-container>
    </div>
  `,
})
export class ButtonPreviewComponent {
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
