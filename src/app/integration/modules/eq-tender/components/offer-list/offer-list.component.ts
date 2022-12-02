import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject, switchMap, tap } from "rxjs";
import { EqTender } from "../../model/eq-tender.model";
import { CreateTenderApplicationDTO, CreateTenderOfferDTO, EqTenderService } from "../../services/eq-tender.service";

@Component({
  selector: 'tender-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
  @Input() i_Tender: EqTender | null = null;
  m_Step = 0;

  m_Form: UntypedFormGroup = new UntypedFormGroup({});
  m_MiniForms: UntypedFormGroup = new UntypedFormGroup({});

  m_Error$: Observable<string | null> = this.m_EqTenderService.m_Error$.pipe(
    tap(err => {
      if (err) this.m_SnackBar.open(err, 'close', { duration: 4000 });
    })
  );
  m_SubmitForm$: Subject<CreateTenderApplicationDTO> = new Subject().pipe(
    switchMap((dto: any) => {
      return this.m_EqTenderService.createTenderApplication(dto).pipe(
        tap(_ => {
          this.m_SnackBar.open("Tender offer has been created successfully", 'close', { duration: 4000 });
          this.m_Router.navigate(['..'], { relativeTo: this.m_Route });
        })
      );
    })
  ) as Subject<CreateTenderApplicationDTO>;

  constructor(private m_SnackBar: MatSnackBar, 
              private m_EqTenderService: EqTenderService, 
              private m_Router: Router, 
              private m_Route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.i_Tender?.requirements) {
      const reqs = this.i_Tender.requirements;
      this.m_Form.addControl('costs', new UntypedFormGroup({}))
      this.m_Form.addControl('note', new UntypedFormControl(null, Validators.maxLength(512)));
      for (let i = 0; i < reqs.length; i++) {
        this.m_MiniForms.addControl(reqs[i].id + "", new UntypedFormGroup({
          'cost': new UntypedFormControl(null, [Validators.required, Validators.max(100000000)])
        }));
        this.getCostsFormGroup().addControl(reqs[i].id + "", new UntypedFormControl(null, [Validators.required, Validators.max(100000000)]))
      }
    }
  }

  setStep(index: number) {
    this.m_Step = index;
  }
  nextStep() {
    this.m_Step++;
  }
  prevStep() {
    this.m_Step--;
  }

  isInPast(date: Date): boolean {
    var now = new Date();
    var n = new Date(date)
    now.setHours(0, 0, 0, 0);
    if (n <= now) return true;
    return false;
  }

  onSubmit(): void {
    this.m_EqTenderService.clearError();
    if (!this.m_Form.valid) {
      this.m_SnackBar.open(`Prices for all requirements must be provided`, 'close', { duration: 4000 });
      return;
    }
    const raw = this.m_Form.getRawValue();
    const application: CreateTenderApplicationDTO = {
      note: raw['note'],
      equipmentTenderId: this.i_Tender?.id!,
      tenderOffers: []
    };

    for (let reqId in raw['costs']) {
      const offer: CreateTenderOfferDTO = {
        cost: raw['costs'][reqId],
        tenderRequirementId: parseInt(reqId)
      };
      application.tenderOffers.push(offer);
    }

    this.m_SubmitForm$.next(application);
  }

  costSubmit(id: any): void {
    const miniForm = this.getMiniFormGroup(id);
    if (!miniForm.valid) return;

    this.getCostsFormControl(id).setValue(miniForm.getRawValue().cost);
  }

  resetForm(): void {
    this.m_Form.reset();
  }

  getCostsFormControl(name: any): UntypedFormControl {
    return this.getCostsFormGroup().controls[name] as UntypedFormControl;
  }

  getCostsFormGroup(): UntypedFormGroup {
    return this.m_Form.controls['costs'] as UntypedFormGroup;
  }

  getMiniFormGroup(name: any): UntypedFormGroup {
    return this.m_MiniForms.controls[name] as UntypedFormGroup;
  }

  getFormControlValue(name: any): any {
    return this.getCostsFormControl(name).getRawValue()
  }
}