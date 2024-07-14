import { Component } from '@angular/core';
import { ButtonPreviewComponent } from './components/button/button-preview.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    ButtonPreviewComponent, 
  ],
  standalone: true
})
export class AppComponent {
  title = 'angular';
}
