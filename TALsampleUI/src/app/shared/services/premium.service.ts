import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IOccupation } from '../../_interfaces/premium/IOccupation.model';
import { IQuote } from '../../_interfaces/premium/IQuote.model';
import { EnvironmentUrlService } from '../../shared/services/environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class PremiumService {

  constructor(private httpClient: HttpClient, private envUrl: EnvironmentUrlService) { }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  public getOccupations = () =>
  {
    return this.httpClient.get<IOccupation[]>(this.createCompleteRoute('api/occupations', this.envUrl.ApiUrlAddress));
  }

  public getPremium = (quote: IQuote) => {
    return this.httpClient.post<IQuote>(this.createCompleteRoute('api/quotes', this.envUrl.ApiUrlAddress), quote);
  }

}
