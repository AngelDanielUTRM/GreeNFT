import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Nfts } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-set-nft',
  templateUrl: './set-nft.component.html',
  styleUrls: ['./set-nft.component.scss'],
})
export class SetNftComponent implements OnInit {

  newNfts: Nfts ={
    nombre: '',
    precio_normal: null,
    precio_rebajado: null,
    foto: '',
    id: this.firestoreservice.getId(),
    fecha: new Date()
  };

  private path = "nfts/"

  constructor(public menucontroler: MenuController,
              public firestoreservice: FirestoreService) { }

  ngOnInit() {}

  openMenu()
  {
    console.log('openMenu');
    this.menucontroler.toggle('principal');
  }

  guardarNFT(){

    this.firestoreservice.createDoc(this.newNfts,this.path,this.newNfts.id);
  }
}
