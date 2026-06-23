import { Component, inject, signal } from '@angular/core';

import { SharedModule } from '../../../shared/shared-module';

import { Languages as LanguagesService } from '../../../shared/services/languages';

import { Languages } from '../../../shared/enums/languages';

@Component({
  selector: 'app-navbar',
  imports: [SharedModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  languagesService = inject<LanguagesService>(LanguagesService);
  languages = signal(Languages);

  changeLanguage(): void {
    this.languagesService.changeLanguage(this.languagesService.isRtl ? Languages.EN : Languages.AR);
  }
}
