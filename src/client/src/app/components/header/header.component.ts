import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() loggedIn: boolean;
  @Input() email: string;
  @Output() signOut = new EventEmitter();

  constructor() { }

  logout() {
    return this.signOut.emit();
  }

}
