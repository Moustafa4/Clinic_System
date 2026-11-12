import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import Swal, { SweetAlertIcon } from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private clipboard: Clipboard) {}

  handleErorr(err: HttpErrorResponse) {
    if (Array.isArray(err?.error) || Array.isArray(err?.error?.message)) {
      const firstArrayMessage = this.toSingleMessage(err?.error?.message ?? err.error);
      this.alert(firstArrayMessage, '', 'error', err);
      return;
    }

    if (typeof err.error == 'string') {
      this.alert(err.error, ' ', 'error', err);
    }
    ///usually this is a business logic error with descriptive message
    else if (err.status == 400) {
      this.alert(this.toSingleMessage(err.error.message), 'Code: 400', 'info');
    } else if (err.status == 404) {
      this.alert('Server error happened!\nContact your admin', `Code: ${err.status}`, 'error', err);
    } else if (err.status == 405) {
      this.alert(
        'Server error happened!\nContact your admin',
        `Code: ${err.status}`,
        'error',
        err.message,
      );
    } else if (err.error && err.error.message == 'Token has expired') {
      this.alert('Token has been expired, please try login again', '', 'error');
    } else if (err.status == 500) {
      this.alert('Server error happened!\nContact your admin', 'Code: 500', 'error', err);
    } else if (err.error.error) {
      this.alert(this.toSingleMessage(err.error.error), ' ', 'error', err);
    } else if (err.status == 422) {
      const errMsgs = this.toSingleMessage(this.extractValidationErrors(err));
      if (err.error.items) {
        const firstFieldError = this.getFirstFieldError(err.error.items);
        this.alert(firstFieldError, 'Validation error', 'error', err);
      } else if (err.error.errors) {
        const firstFieldError = this.getFirstFieldError(err.error.errors);
        this.alert(firstFieldError, 'Validation error', 'error', err);
      } else {
        this.alert(errMsgs, 'Validation error', 'error', err);
      }
    } else if (
      (typeof err.error.message == 'string' || Array.isArray(err.error.message)) &&
      err.status != 500
    ) {
      this.alert(this.toSingleMessage(err.error.message), '', 'error', err);
    } else if (err.error) {
      if (err.error.errors) {
        if (Object.keys(err.error.errors)) {
          let keys = Object.keys(err.error.errors);
          this.alert(this.toSingleMessage(err.error.errors[keys[0]]), '', 'error', err);
        }
      }
    } else {
      this.alert(
        'Something went wrong, please try again later or contact the admin',
        `Code ${err.status}`,
        'error',
        err,
      );
    }
  }

  private alert(title: string, message?: string, type?: SweetAlertIcon, err?: any) {
    Swal.fire({
      title: title,
      icon: type,
      text: message,
      allowEnterKey: true,
      showConfirmButton: true,
      confirmButtonText: 'Ok',
      showCancelButton: !!err,
      cancelButtonText: 'Copy error',
      cancelButtonColor: '#286090',
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle confirmation if needed
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.clipboard.copy(JSON.stringify(err));
      }
    });
  }

  private extractValidationErrors(errorResponse: HttpErrorResponse) {
    // 1 - Create empty array to store errors
    const errors = [];
    // 2 - check if the error object is present in the response
    if (errorResponse.error) {
      // 3 - Push the main error message to the array of errors
      errors.push(errorResponse.error.message);
      // 4 - Check for Laravel form validation error messages object
      if (errorResponse.error.errors) {
        // 5 - For each error property (which is a form field)
        for (const property in errorResponse.error.errors) {
          if (errorResponse.error.errors.hasOwnProperty(property)) {
            // 6 - Extract it's array of errors
            const propertyErrors: Array<string> = errorResponse.error.errors[property];
            // 7 - Push all errors in the array to the errors array
            propertyErrors.forEach((error) => errors.push(error));
          }
        }
      }
    }
    return errors;
  }

  private toSingleMessage(value: any): string {
    if (Array.isArray(value)) {
      if (!value.length) return '';
      return this.toSingleMessage(value[0]);
    }

    if (value === null || value === undefined) {
      return '';
    }

    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }

    if (typeof value?.message === 'string' || Array.isArray(value?.message)) {
      return this.toSingleMessage(value.message);
    }

    if (typeof value?.error === 'string' || Array.isArray(value?.error)) {
      return this.toSingleMessage(value.error);
    }

    return JSON.stringify(value);
  }

  private getFirstFieldError(errorsObject: any): string {
    const keys = Object.keys(errorsObject || {});
    if (!keys.length) {
      return '';
    }

    const firstField = keys[0];
    const firstFieldMessage = this.toSingleMessage(errorsObject[firstField]);

    if (!firstFieldMessage) {
      return firstField;
    }

    return `${firstFieldMessage}`;
  }

  private _alert(title: string, message?: string, type?: SweetAlertIcon, err?: any) {
    let counter = 10;
    let timerInterval;

    Swal.fire({
      title: 'New Version Updated',
      icon: 'error',
      html: `system will reload in <strong id="counter">${counter}</strong> seconds.`,
      allowEnterKey: false,
      showConfirmButton: false,
      confirmButtonText: 'Reload',
      showCancelButton: false,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#286090',
      timer: counter * 1000,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
        // window.location.reload();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // hard reload
        window.location.reload();
      }
    });
  }
}
