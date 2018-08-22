import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { serverUrl } from './config/serverConf'

@Injectable({
    providedIn: 'root'
})

export class AppService {

    
    constructor(
        private http: HttpClient) { }

        getPmReadings(date_time, isDateAlone) {
        const url = serverUrl.url+`/v1/environment/pm25`;   //Endpoint path

        /* Set query parameters */
        let httpParams = new HttpParams();
        httpParams = isDateAlone? httpParams.append('date',date_time) : httpParams.append('date_time',date_time)

        const httpOptions = {
            params: httpParams
        };        
        
        return this.http.get(url, httpOptions)
            .pipe(
                catchError(this.handleError('getPmReadings', null))
            )
    }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
