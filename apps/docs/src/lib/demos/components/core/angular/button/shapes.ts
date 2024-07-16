import { Component } from '@angular/core';
import { HlmButtonModule } from '@/lib/components/core/default/angular/button/hlm-button.module';

@Component({
  selector: 'button-preview',
  standalone: true,
  imports: [HlmButtonModule],
  template: `
    <div className="flex items-center justify-center gap-4">
      <Button hlmBtn size="sm" shape="square" aria-label="upload">
        <UploadIcon />
      </Button>
      <Button hlmBtn size="md" shape="square" aria-label="upload">
        <UploadIcon />
      </Button>
      <Button hlmBtn size="lg" shape="square" aria-label="upload">
        <UploadIcon />
      </Button>
      <Button size="sm" shape="circle" aria-label="upload">
        <UploadIcon />
      </Button>
      <Button size="md" shape="circle" aria-label="upload">
        <UploadIcon />
      </Button>
      <Button size="lg" shape="circle" aria-label="upload">
        <UploadIcon />
      </Button>
    </div>
  `,
})

export class ButtonPreviewComponent {
}