import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { InterpolatableTranslationObject, TranslateService } from '@ngx-translate/core';

import { Languages } from '../enums/languages';

@Injectable({
    providedIn: 'root'
})
export class Translation {
    private readonly translateService = inject(TranslateService);

    setFallbackLanguage(language: Languages): void {
        this.translateService.setFallbackLang(language);
    }

    useLanguage(language: Languages): Observable<InterpolatableTranslationObject> {
        return this.translateService.use(language);
    }
}
