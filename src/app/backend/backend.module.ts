import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetNftComponent } from './set-nft/set-nft.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SetNftComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ]
})
export class BackendModule { }
