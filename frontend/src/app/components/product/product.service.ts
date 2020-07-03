import { ProductReadTO } from './product.read.to';
import { map, catchError } from 'rxjs/operators';
import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, '❌', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  read(page: number = 0, limit: number = 5, sort: string = 'id', order: string = 'asc'): Observable<ProductReadTO> {
    let params = `?_page=${page + 1}&_limit=${limit}&_sort=${sort}&_order=${order}`
    return this.http.get(this.baseUrl + params, { observe: 'response' })
      .pipe(
        map(response => {
          const productReadTO: ProductReadTO = {
            products: <Product[]>response.body,
            total: parseInt(response.headers.get('X-Total-Count'))
          }

          return productReadTO
        }),
        catchError(e => this.errorHandler(e))
      )
  }

  readById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    console.error(e)
    this.showMessage('Ocorreu um erro', true)
    return EMPTY
  }
}
