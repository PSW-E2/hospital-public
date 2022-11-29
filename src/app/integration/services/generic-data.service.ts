import { BehaviorSubject, catchError, EMPTY, Observable, switchMap, of } from "rxjs";

export abstract class GenericDataService<DataType> {
  protected m_DataSubject: BehaviorSubject<DataType | null> = new BehaviorSubject<DataType | null>(null);
  public m_Data$: Observable<DataType | null> = this.m_DataSubject.asObservable();

  protected m_ErrorSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public m_Error$: Observable<string | null> = this.m_ErrorSubject.asObservable().pipe(
    switchMap(err => err ? of(err) : EMPTY)
  );

  set setData(data: DataType | null) {
    this.m_DataSubject.next(data);
  }
  clearData(): void {
    this.m_DataSubject.next(null);
  }

  set setError(error: string | null) {
    this.m_ErrorSubject.next(error);
  }
  clearError(): void {
    this.m_ErrorSubject.next(null);
  }

  resetData(): void {
    this.clearData();
    this.clearError();
  }

  protected addErrorHandler(obs: Observable<any>) {
    return obs.pipe(
      catchError(res => {
        console.log(res);
        const error = res.error;
        if (error && error.message) {
          this.setError = error.message;
        } else {
          this.setError = "Unknown error has occurred";
        }
        return EMPTY;
      })
    );
  }
}