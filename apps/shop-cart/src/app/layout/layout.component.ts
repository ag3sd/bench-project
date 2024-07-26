import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonService, Screens } from '../common.service';
import { selectScreen } from '../nav/nav.reducer';

@Component({
  selector: 'bench-project-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  Screens;
  currentScreen$: Observable<string>;
  constructor(private service: CommonService, private store: Store) {
    this.Screens = Screens;
    this.currentScreen$ = store.select(selectScreen);
  }

}
