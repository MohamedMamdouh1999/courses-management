import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

const modules = [
  CommonModule
];

const pipes = [
  TranslatePipe,
  TranslateDirective
];

@NgModule({
  imports: [...modules, ...pipes],
  exports: [...modules, ...pipes]
})
export class SharedModule {}
