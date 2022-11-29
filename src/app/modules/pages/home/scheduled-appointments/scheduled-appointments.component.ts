import { Component, OnInit } from '@angular/core';
import { Appointment } from '../model/schedules.model';
import { ScheduledAppointmentsService } from './services/Scheduled.Appointments.service';

@Component({
  selector: 'app-scheduled-appointments',
  templateUrl: './scheduled-appointments.component.html',
  styleUrls: ['./scheduled-appointments.component.scss']
})
export class ScheduledAppointmentsComponent implements OnInit {

  public appointments: Appointment[] = [];

  constructor(private _scheduledAppointmentsService: ScheduledAppointmentsService ) { 
  }

  ngOnInit(): void {
    this.getAppointments();
  }

  public getAppointments(){
    this._scheduledAppointmentsService.getAppointments().subscribe(res => {
      this.appointments = res;
    });
  }

}
