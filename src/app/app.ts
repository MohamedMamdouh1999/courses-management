import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';

import { Languages } from './shared/services/languages';
import { SharedModule } from './shared/shared-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster, SharedModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  languageService = inject(Languages);

  ngOnInit(): void {
    this.initDefaultLanguage();
  }

  private initDefaultLanguage(): void {
    this.languageService.initDefaultLanguage();
  }
}
