import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CustomValidators } from './custom-validator';
import { AllergensResponse, BloodType } from './interfaces';
import { AllergenService } from './services/allergen.service';
import { DoctorService } from './services/doctor.service';
import { AuthService } from './services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    name: new FormControl(null, [Validators.required]),
    surname: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required]),
    bloodType: new FormControl(),
    allergens: new FormControl(),
    doctorsId: new FormControl()
  },
  // add custom Validators to the form, to make sure that password and passwordConfirm are equal
  { validators: CustomValidators.passwordsMatching }
  )

  allergensList: any = [];
  selectedAllergens = [];
  bloodTypes: BloodType[] = [
    {value: 'AB+', viewValue: 'AB+'},
    {value: 'AB-', viewValue: 'AB-'},
    {value: 'A+', viewValue: 'A+'},
    {value: 'A-', viewValue: 'A-'},
    {value: 'B+', viewValue: 'B+'},
    {value: 'B-', viewValue: 'B-'},
    {value: 'O+', viewValue: 'O+'},
    {value: 'O-', viewValue: 'O-'},
  ];
  doctors: any = [];

  constructor( 
    private router: Router,
    private authService: AuthService,
    private allergenService: AllergenService,
    private doctorService: DoctorService
    ) { }

  ngOnInit(): void {
    this.allergenService.getAllergens()
      .subscribe( res => this.allergensList = res);
    this.doctorService.getDoctors()
      .subscribe( res => this.doctors = res);
  }

  register() {
    if (!this.registerForm.valid) {
      return;
    }
    this.authService.register(this.registerForm.value).pipe(
      // If registration was successfull, then navigate to login route
      tap(() => this.router.navigate(['../login']))
    ).subscribe();
  }


}
