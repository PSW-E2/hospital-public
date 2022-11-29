import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Appointment } from "../../model/schedules.model";

@Injectable({
    providedIn: 'root'
  })
export class ScheduledAppointmentsService {
    
    apiHost: string = 'http://localhost:16177/';
    headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


    constructor(private http: HttpClient) {}

    getAppointments() : Observable<Appointment[]> {
        return this.http.get<Appointment[]>(this.apiHost + 'api/appointments/id', {headers: this.headers});
    }


}