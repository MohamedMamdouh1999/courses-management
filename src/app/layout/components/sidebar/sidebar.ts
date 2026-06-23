import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SharedModule } from '../../../shared/shared-module';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, SharedModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {}
