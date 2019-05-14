import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Player, Team } from './models/fut.models';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  someApiCall() {
    return of([]).pipe(tap(() => console.log('log from service')));
  }

  public getAllTeams() {
    return this.http.get('http://localhost:3000/team').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(err);
      })
    );
  }

  public addPlayer(teamId: number, team: Team) {
    return this.http.patch(`http://localhost:3000/team/${teamId}`, team).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(err);
      })
    );
  }
}
