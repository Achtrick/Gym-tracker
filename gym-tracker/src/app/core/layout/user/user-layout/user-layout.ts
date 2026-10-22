import { Component } from '@angular/core';
import { MenuBar } from '../menu-bar/menu-bar';

@Component({
  imports: [MenuBar],
  selector: 'gym-tracker-user-layout',
  styleUrl: './user-layout.scss',
  templateUrl: './user-layout.html',
})
export class UserLayout {}
