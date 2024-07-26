import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@bench-project/api-interfaces';

@Component({
  selector: 'bench-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient) { }
}
