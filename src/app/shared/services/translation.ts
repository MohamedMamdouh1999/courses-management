import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { InterpolatableTranslationObject, TranslateService } from '@ngx-translate/core';

import { Languages } from '../enums/languages';

@Service()
export class Translation {
    private readonly translateService = inject(TranslateService);

    setFallbackLanguage(language: Languages): void {
        this.translateService.setFallbackLang(language);
    }

    useLanguage(language: Languages): Observable<InterpolatableTranslationObject> {
        return this.translateService.use(language);
    }
}
