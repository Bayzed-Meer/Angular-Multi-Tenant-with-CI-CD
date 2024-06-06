import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    let errorMessage = '';

    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request. Please check your input.'; // User submits invalid form and should be notified about it using toaster or snackbar.
          break;
        case 401:
          errorMessage = 'Unauthorized. Please log in again.'; // User is trying to access any route without login.
          break;
        case 403:
          errorMessage = 'Forbidden. You do not have permission to perform this action.'; // User trying to perform a action that only admin can do.
          break;
        case 404:
          errorMessage = 'Not Found. The resource you are looking for does not exist.'; // User searched for anything that is not found
          break;
        case 415:
          errorMessage = 'Unsupported Media Type. Please check the format of your request.'; // User submited a file that is not supported by server like for image server only accpet jpg but user giving png.
          break;
        case 426:
          errorMessage = 'Upgrade Required. Please upgrade your client.'; // There is a breaking update available therefor user should first update their application before accessing.
          break;
        case 429:
          errorMessage = 'Too Many Requests. Please try again later.'; // User requesting for any url in a very short period of time.
          break;
        case 431:
          errorMessage =
            'Request Header Fields Too Large. Please reduce the size of your request headers.';
          break;
        case 500:
          errorMessage = 'Internal Server Error. Please try again later.'; // Server throws an handled error
          break;
        case 502:
          errorMessage = 'Bad Gateway. Please try again later.';
          break;
        case 503:
          errorMessage = 'Service Unavailable.';
          break;
        case 504:
          errorMessage = 'Gateway Timeout. Please try again later.';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    } else {
      errorMessage = error.message ? error.message : errorMessage;
    }
    console.log('Global Error handler:', errorMessage);
  }
}
