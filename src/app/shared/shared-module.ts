import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterOutlet, RouterLink } from '@angular/router';

import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule
];

const pipes = [
  TranslatePipe,
  TranslateDirective
];

const others = [
  RouterOutlet,
  RouterLink
];

@NgModule({
  imports: [...modules, ...pipes, ...others],
  exports: [...modules, ...pipes, ...others]
})
export class SharedModule {}
