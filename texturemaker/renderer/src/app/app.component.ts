import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { EditAreaComponent } from './edit-area/edit-area.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EditAreaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Texture Maker';
}
