import { ProductService } from './../product.service';
import { Product } from '../product.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, BehaviorSubject } from 'rxjs';

export class ProductReadSchematicsCustomizedDataSource extends DataSource<Product> {
  total: number;
  data: Product[];
  paginator: MatPaginator;
  sort: MatSort;

  private productsSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private productService: ProductService) {
    super();    
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Product[]> {    
    return this.productsSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.productsSubject.complete();
    this.loadingSubject.complete();
  }

  get(page: number = 0, limit:number = 5, sort: string = 'id', order: string = 'asc') {
    this.loadingSubject.next(true);

    this.productService.read(page, limit, sort, order)
      .subscribe(productReadTO => {
        this.loadingSubject.next(false);
        this.productsSubject.next(productReadTO.products);
        this.paginator.length = productReadTO.total;
      })
  }

}