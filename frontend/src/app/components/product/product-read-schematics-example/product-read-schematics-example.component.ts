import { Product } from './../product.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductService } from '../product.service';
import { ProductReadSchematicsCustomizedDataSource } from './product-read-schematics-customized-datasource';

@Component({
  selector: 'app-product-read-schematics-example',
  templateUrl: './product-read-schematics-example.component.html',
  styleUrls: ['./product-read-schematics-example.component.css']
})
export class ProductReadSchematicsExampleComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Product>;  
  dataSource: ProductReadSchematicsCustomizedDataSource = new ProductReadSchematicsCustomizedDataSource(this.productService)

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'price'];

  constructor(private productService: ProductService) {   
  }

  ngOnInit() {
    // Ao inicializar, faz a busca usando os valores padrão de paginação/ordenação
    this.dataSource.get();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;    

    // Subscribe para receber o evento de retorno após cada manipulação do paginator,
    // realizando nova pesquisa get de forma paginada
    this.paginator.page.subscribe(() => {            
      this.dataSource.get(this.paginator.pageIndex, this.paginator.pageSize)
    })

    // this.sort.sortChange.subscribe(() => {
    //   console.log(this.sort.direction)
    //   console.log(this.sort.active)
    // })
  }

  /**
   * Há uma outra forma de disparar o evento de mudança do paginator.
   * É possível criar um event bind no mat-paginator para este método.
   * Exemplo:
   * 
   * <mat-paginator #paginator      
      [length]="8"
      [pageIndex]="0"
      [pageSize]="5"
      [pageSizeOptions]="[5, 10, 15, 20]"
      (page)="onChangePage($event)">
      </mat-paginator>
   * @param event 
   */
  onChangePage(event) {
    console.log("event", event);
  }
}
