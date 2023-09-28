import { Component , OnDestroy , OnInit  } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT :{[id:number]:number}={1:400 , 3:335 , 4:350} ;
@Component({
  selector: 'app-home',
  templateUrl: './home.Component.html',
})
export class HomeComponent implements OnInit, OnDestroy{
cols=3;
rowheight=ROWS_HEIGHT[this.cols];
category: string | undefined;
products: Array<Product> | undefined;
sort = 'desc';
count = '12';
productsSubscription: Subscription | undefined;



constructor(
  private cartService: CartService,
  private storeService: StoreService
) {}

ngOnInit(): void {
  this.getProducts();
}
  onColumnsCountChange(colsNum:number):void
  {this.cols=colsNum;
  this.rowheight=ROWS_HEIGHT[this.cols];}



  
  onItemsCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();
  }
  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }


  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }




  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }



  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }



  
  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
