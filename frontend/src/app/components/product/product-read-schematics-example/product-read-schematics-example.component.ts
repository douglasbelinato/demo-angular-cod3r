import { Product } from './../product.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductReadSchematicsExampleDataSource } from './product-read-schematics-example-datasource';

@Component({
  selector: 'app-product-read-schematics-example',
  templateUrl: './product-read-schematics-example.component.html',
  styleUrls: ['./product-read-schematics-example.component.css']
})
export class ProductReadSchematicsExampleComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Product>;
  dataSource: ProductReadSchematicsExampleDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'priceId'];

  ngOnInit() {
    this.dataSource = new ProductReadSchematicsExampleDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
