import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TeamModel } from 'src/app/shared/store';

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

	public addPlayer(teamId: number, team: TeamModel) {
		return this.http.patch(`http://localhost:3000/team/${teamId}`, team).pipe(
			catchError((err: any) => {
				console.log(err);
				return throwError(err);
			})
		);
	}
}
