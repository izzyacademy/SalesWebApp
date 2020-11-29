
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DepartmentSalesReportForDate, MaxProductSales, ProductSalesReportForDate} from './models/report-response';
import {AppSettings} from './app.settings';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly observeResponseOptions;

  private readonly  deleteResponseOptions;

  /**
   * Constructor
   * @param httpClient Automatically Injected HTTP Client Object
   */
  constructor(private httpClient: HttpClient) {

    const requestHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json') // specify the content type we are sending
      .set('Accept', 'application/json'); // specify the content type we are expecting back

    // This is used by most of the request types
    this.observeResponseOptions = {headers : requestHeaders, observe: 'response', responseType: 'json'};

    // DELETE can be different sometimes so setting up a custom one for DELETE requests.
    this.deleteResponseOptions = {headers: requestHeaders, observe: 'response', responseType: 'json'};
  }


  /**
   * Used to Retrieve Department Sales
   *
   * @param reportDate Specified date for the report
   */
  public getDepartmentSalesForDate(reportDate: string): Observable<HttpResponse<DepartmentSalesReportForDate[]>> {

    // Construct the Request URL
    const url = AppSettings.API_ENDPOINT + '/departments/sales/' + reportDate;

    return this.httpClient
      .get<DepartmentSalesReportForDate[]>(url,
        this.observeResponseOptions ) as (Observable<HttpResponse<DepartmentSalesReportForDate[]>>);
  }

  /**
   * Used to Retrieve Product Sales
   *
   * @param reportDate Specified date for the report
   */
  public getProductSalesForDate(reportDate: string): Observable<HttpResponse<ProductSalesReportForDate[]>> {

    // Construct the Request URL
    const url = AppSettings.API_ENDPOINT + '/products/sales/' + reportDate;

    return this.httpClient
      .get<ProductSalesReportForDate[]>(url,
        this.observeResponseOptions ) as (Observable<HttpResponse<ProductSalesReportForDate[]>>);
  }

  /**
   * Used to Max Product Sales
   *
   */
  public getMaxProductSales(): Observable<HttpResponse<MaxProductSales[]>> {

    // Construct the Request URL
    const url = AppSettings.API_ENDPOINT + '/products/max-sales/daily';

    return this.httpClient
      .get<MaxProductSales[]>(url,
        this.observeResponseOptions ) as (Observable<HttpResponse<MaxProductSales[]>>);
  }
}
