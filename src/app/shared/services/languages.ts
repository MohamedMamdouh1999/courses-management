import { DOCUMENT, Inject, Injectable, signal } from '@angular/core';

import { Translation } from './translation';

import { Languages as LanguagesEnum } from '../enums/languages';
import { Directions } from '../enums/directions';

@Injectable({
    providedIn: 'root'
})
export class Languages  {
    private html = signal<HTMLElement>(null!);
    private currentLanguage = signal<LanguagesEnum>(LanguagesEnum.AR);
    private languageKey = signal<string>('language').asReadonly();
    private defaultLanguage = signal<LanguagesEnum>(LanguagesEnum.AR).asReadonly();

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly translationService: Translation
    ) {
        this.currentLanguage.set(localStorage.getItem(this.languageKey()) as LanguagesEnum || this.defaultLanguage());
        this.html.set(this.document.getElementsByTagName('html')[0]);
    }

    initDefaultLanguage(): void {
        this.translationService.setFallbackLanguage(this.currentLanguage() as LanguagesEnum);
        localStorage.setItem(this.languageKey(), this.currentLanguage());
        this.updateLayoutDirection();
    }

    changeLanguage(language: LanguagesEnum): void {
        this.translationService.useLanguage(language);
        this.currentLanguage.set(language);
        localStorage.setItem(this.languageKey(), language);
        this.updateLayoutDirection();
    }

    private updateLayoutDirection(): void {
        this.html().lang = this.currentLanguage();
        this.document.body.dir = this.isRtl ? Directions.RTL : Directions.LTR;
    }

    get isRtl(): boolean {
        return this.currentLanguage() === LanguagesEnum.AR;
    }
}
