import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { studentType } from '../models/student';
import { Product } from '../models/product';
import { Order } from '../models/order';
@Injectable({
  providedIn: 'root',
})
export class ServerHttpService {
  private REST_API_SERVER = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  public getStudents() {
    const url = `${this.REST_API_SERVER}/students`;
    return this.httpClient.get<any>(url).pipe(catchError(this.handleError));
  }

  public getStudent(id: string) {
    const url = `${this.REST_API_SERVER}/students/${id}`;
    return this.httpClient.get<any>(url).pipe(catchError(this.handleError));
  }

  public addStudent(data: studentType) {
    const url = `${this.REST_API_SERVER}/students`;
    return this.httpClient
      .post<any>(url, data)
      .pipe(catchError(this.handleError));
  }
  public editStudent(data: studentType, id: string) {
    const url = `${this.REST_API_SERVER}/students/${id}`;
    return this.httpClient
      .put<any>(url, data)
      .pipe(catchError(this.handleError));
  }
  public deleteStudent(id: string) {
    const url = `${this.REST_API_SERVER}/students/${id}`;
    return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
  }

  //Product

  public getProductList() {
    const url = `${this.REST_API_SERVER}/productList`;
    return this.httpClient.get<any>(url).pipe(catchError(this.handleError));
  }
  public getProduct(id: string) {
    const url = `${this.REST_API_SERVER}/productList/${id}`;
    return this.httpClient.get<any>(url).pipe(catchError(this.handleError));
  }
  public addProduct(data: Product) {
    const url = `${this.REST_API_SERVER}/productList`;
    return this.httpClient
      .post<any>(url, data)
      .pipe(catchError(this.handleError));
  }
  public editProduct(data: Product, id: string) {
    const url = `${this.REST_API_SERVER}/productList/${id}`;
    return this.httpClient
      .put<any>(url, data)
      .pipe(catchError(this.handleError));
  }
  public deleteProduct(id: string) {
    const url = `${this.REST_API_SERVER}/productList/${id}`;
    return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
  }

  ///ORDERS
  public getOrders() {
    const url = `${this.REST_API_SERVER}/orders`;
    return this.httpClient.get<any>(url).pipe(catchError(this.handleError));
  }
  public getOrder(id: string) {
    const url = `${this.REST_API_SERVER}/orders/${id}`;
    return this.httpClient.get<any>(url).pipe(catchError(this.handleError));
  }
  public addOrder(data: Order) {
    const url = `${this.REST_API_SERVER}/orders`;
    return this.httpClient
      .post<any>(url, data)
      .pipe(catchError(this.handleError));
  }
  public editOrder(data: Order, id: string) {
    const url = `${this.REST_API_SERVER}/orders/${id}`;
    return this.httpClient
      .put<any>(url, data)
      .pipe(catchError(this.handleError));
  }
  public deleteOrder(id: string) {
    const url = `${this.REST_API_SERVER}/orders/${id}`;
    return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
