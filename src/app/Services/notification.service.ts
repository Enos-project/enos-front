import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {
    toastrConfiguration = {
        closeButton: true,
        enableHtml: true,
        progressBar: true,
        positionClass: 'toast-bottom-right'
    };

    constructor(private toastr: ToastrService) { }

    success(message: string, title: string): void {
        this.toastr.success(message, title, this.toastrConfiguration);
    }

    info(message: string, title: string): void {
        this.toastr.info(message, title, this.toastrConfiguration);
    }

    warning(message: string, title: string): void {
        this.toastr.warning(message, title, this.toastrConfiguration);
    }

    error(message: string, title: string): void {
        this.toastr.error(message, title, this.toastrConfiguration);
    }
}
