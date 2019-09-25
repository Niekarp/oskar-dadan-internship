import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retryWhen, delay, tap, timeout, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    const url = `${this.apiUrl}/users`;
    const request = this.http.get<User[]>(url);
    return this.pipeStandardRequestStrategy(request);
  }

  private pipeStandardRequestStrategy<T>(observable: Observable<T>, stopApp = true): Observable<T> {
    const retryCount = 3;
    const timeoutTime = 6500;
    const retryInterval = 5000;

    return observable.pipe(
        timeout(timeoutTime),
        retryWhen(errors => {
          return errors.pipe(
              map((error, index) => {
                if (index === retryCount) {
                  throw error;
                }
                return error;
              }),
              delay(retryInterval),
              take(retryCount + 1));
        }),
        catchError(err => this.handleError(err, stopApp)));
  }

  private handleError(error: Error, stopApp: boolean): Observable<never> {
    console.error(error);
    if (stopApp) {
      alert('Cannot connect to the server. Please visit the website later');
    }
    return throwError('api request error occured');
  }

}
