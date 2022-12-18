import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'drag-drop-test';

  list = [
    {
      name: 'item 1',
      value: 'item 1 value'
    },
    {
      name: 'item 2',
      value: 'item 2 value'
    },
    {
      name: 'item 3',
      value: 'item 3 value'
    },
    {
      name: 'item 4',
      value: 'item 4 value'
    },
    {
      name: 'item 5',
      value: 'item 5 value'
    },
  ]
}
