import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { UserDataService } from "../../../login/log-user-data.service";
import { Appointment } from "../../model/schedules.model";

@Injectable({
    providedIn: 'root'
  })
export class ScheduledAppointmentsService {
    
    apiHost: string = 'http://localhost:16177/';
    headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    public id: number = 0;

    constructor(private http: HttpClient, private userDataService : UserDataService) { 
        this.userDataService.m_UserData$.pipe(tap(user_data => {
          if(user_data != null)this.id = user_data.UserId;
        })).subscribe();
      }

    getAppointments() : Observable<Appointment[]> {
        return this.http.get<Appointment[]>(this.apiHost + 'api/appointments/id/' + this.id, {headers: this.headers});
    }


}