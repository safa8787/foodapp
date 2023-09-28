import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service' ;
import { loadStripe } from '@stripe/stripe-js';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProductDialogComponent } from 'src/app/components/product-dialog/product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  
})
export class CartComponent {
  cart:Cart={items:[{
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 1,
    id: 1,
},
{
  product: 'https://via.placeholder.com/150',
  name: 'snickers',
  price: 150,
  quantity: 3,
  id: 3,
}
]}
;

dataSource :Array<CartItem> =[];

displayedColumns: Array<string> = [
  'product',
  'name',
  'price',
  'quantity',
  'total',
  'action',
];

constructor(private cartService: CartService, private http: HttpClient, public dialog: MatDialog) {}


ngOnInit() :void{
  this.cartService.cart.subscribe((_cart: Cart) => {
    this.cart = _cart;
    this.dataSource = _cart.items;
  
})
}
getTotal(items: Array<CartItem>) :number

 {
  return this.cartService.getTotal(items);
}




onAddQuantity(item: CartItem): void {
  this.cartService.addToCart(item);
}


onRemoveQuantity(item: CartItem): void {
  this.cartService.removeQuantity(item);
}

 onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }


  onCheckout(): void {
    this.http
      .post('http://localhost:4242/checkout', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe('pk_test_51NAUqWJCxb76lblZRByR3uza0hQTIK0IlaM3KuM61ADET8hfnHdikVuHqLMbblHcMqnj1TwW59lu2kN5BVTtPIm100WQ4szTOd');
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }












  openDialog(product:any) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }
}

