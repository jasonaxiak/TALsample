import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  public ApiUrlAddress: string = environment.ApiUrlAddress;
  constructor() { }
}
