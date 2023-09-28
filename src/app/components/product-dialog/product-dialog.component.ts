
import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';




@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styles: []
})





export class ProductDialogComponent  {
 
  constructor( public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
}


