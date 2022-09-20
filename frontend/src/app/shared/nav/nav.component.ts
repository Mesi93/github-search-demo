import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  navItems: any[] = [
    { title: 'Search', route: '/search' },
    { title: 'History', route: '/history' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
