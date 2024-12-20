import { Component } from '@angular/core';

import { ParentComponent } from './parent/parent.component';

@Component({
  selector: 'app-root',
  imports: [ParentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  items = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];
}
