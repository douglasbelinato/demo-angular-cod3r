import { ProductReadTO } from './product.read.to';
import { map } from 'rxjs/operators';
import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '❌', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
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
        })
      )
  }

  readById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product)
  }
}
