import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() loggedIn: boolean;
  @Output() signOut = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.loggedIn);
  }

  logout() {
    return this.signOut.emit();
  }

}
