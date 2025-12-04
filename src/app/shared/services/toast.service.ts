import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IResponse, ResponseType } from '../models/response-type.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageService = inject(MessageService);

  success(
    detail: string,
    summary = 'Success',
    life?: number,
    key?: string,
  ) {
    return this.messageService.add({
      severity: 'success',
      summary,
      detail,
      life,
      key,
    });
  }

  error(detail: string, summary = 'Error', life?: number, key?: string) {
    return this.messageService.add({
      severity: 'error',
      summary,
      detail,
      life,
      key,
    });
  }

  warning(
    detail: string,
    summary = 'Warning',
    life?: number,
    key?: string,
  ) {
    return this.messageService.add({
      severity: 'warn',
      summary,
      detail,
      life,
      key,
    });
  }

  info(detail: string, summary = 'Info', life?: number, key?: string) {
    return this.messageService.add({
      severity: 'info',
      summary,
      detail,
      life,
      key,
    });
  }

  dismissAll(): void {
    this.messageService.clear();
  }

  dismiss(key: string): void {
    this.messageService.clear(key);
  }

  showResponseMessage(response: IResponse<any>): void {
    switch (response.responseType) {
      case ResponseType.Error:
        this.error(response.message);
        break;
      case ResponseType.Success:
        this.success(response.message);
        break;
      case ResponseType.Warning:
        this.warning(response.message);
        break;
      case ResponseType.Info:
        this.info(response.message);
        break;
      default:
        break;
    }
  }
}
