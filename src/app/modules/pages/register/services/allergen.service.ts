import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, tap } from "rxjs";
import { AllergensResponse } from "../interfaces";

@Injectable({
    providedIn: 'root'
  })
  export class AllergenService {
  
    apiHost: string = 'http://localhost:16177/';
    headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    constructor(
      private http: HttpClient
    ) { }
  
    getAllergens(): Observable<AllergensResponse> {
      return this.http.get<AllergensResponse>(this.apiHost + 'api/allergens', {headers: this.headers})
    }
  
    
  }