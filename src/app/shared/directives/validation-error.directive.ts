import {
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  Renderer2,
  DOCUMENT,
  Input,
} from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { nanoid } from 'nanoid';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[validationError]',
  standalone: true,
  exportAs: 'validationError',
})
export class ValidationErrorDirective implements OnInit {
  private elRef = inject(ElementRef);
  private control = inject(NgControl);
  private document = inject(DOCUMENT);
  private destroyRef = inject(DestroyRef);
  private formGroup = inject(FormGroupDirective);
  private renderer = inject(Renderer2);

  @Input() validationError: string | Record<string, string> = '';
  validationErrorClass = input<string>('');
  validationErrorContainerStyles = input<Record<string, string>>({});
  appendToElement = input<HTMLElement>(this.elRef.nativeElement);

  private errorId = nanoid();

  ngOnInit() {
    this.control.control!.events
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.control.touched && this.control.status === 'INVALID') {
          this.showError();
        } else {
          this.hideError();
        }
      });
    this.formGroup.ngSubmit.subscribe(() => {
      if (this.formGroup.submitted && this.control.invalid) {
        this.showError();
      } else {
        this.hideError();
      }
    });
  }

  @HostListener('onBlur')
  @HostListener('blur')
  handleBlurEvent() {
    if (this.control.errors) {
      this.showError();
    } else {
      this.hideError();
    }
  }

  private showError() {
    this.hideError();
    const errorContent =
      typeof this.validationError === 'string' || this.validationError === undefined
        ? `<div class="flex gap-1 align-items-center">
            ${this.validationError ? '<i class="ml-1 pi pi-exclamation-circle"></i>' : ''}
            <span>${this.validationError || ''}</span>
          </div>`
        : Object.keys(this.control.errors || {})
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .map((key) => this.validationError[key])
            .map(
              (content) => `
            <div class="flex gap-1 align-items-center">
                ${content ? '<i class="ml-1 pi pi-exclamation-circle"></i>' : ''}
                <span>
                    ${content}
                </span>
            </div>`,
            )
            .join('\n');
    const errorElement = `
        <div id="${this.errorId}" class="text-red-500 text-sm flex flex-column gap-1 ${this.validationErrorClass()}" style="${this.validationErrorContainerStyles()}">
            ${errorContent}
        </div>
    `;
    const appendToElement = this.appendToElement();
    if (appendToElement?.parentElement) {
      appendToElement.parentElement.insertAdjacentHTML('beforeend', errorElement);
    }
    this.renderer.addClass(appendToElement, 'is-invalid');
    this.renderer.addClass(appendToElement, 'ng-invalid');
    this.renderer.addClass(appendToElement, 'ng-dirty');
  }

  private hideError() {
    const errorElement = this.document.getElementById(this.errorId);
    if (errorElement) {
      this.renderer.removeClass(this.elRef.nativeElement, 'is-invalid');
      this.renderer.removeClass(this.elRef.nativeElement, 'ng-invalid');
      this.renderer.removeClass(this.elRef.nativeElement, 'ng-dirty');
      errorElement.remove();
    }
  }
}
