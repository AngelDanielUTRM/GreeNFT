import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Nft } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-set-nft',
  templateUrl: './set-nft.component.html',
  styleUrls: ['./set-nft.component.scss'],
})
export class SetNftComponent implements OnInit {

  nfts: Nft [] = [];

  newNfts: Nft;

  EnableNewNft = false;

  private path = "nfts/"

  constructor(public menucontroler: MenuController,
              public firestoreservice: FirestoreService) { }

  ngOnInit() {
    this.getNFT();
  }

  openMenu()
  {
    console.log('openMenu');
    this.menucontroler.toggle('principal');
  }

  guardarNFT(){

    this.firestoreservice.createDoc(this.newNfts,this.path,this.newNfts.id);
  }

  getNFT(){
    this.firestoreservice.getCollection<Nft>(this.path).subscribe(res => {
      this.nfts = res;
    });
  }

  deleteNFT(nft: Nft){
    this.firestoreservice.deleteDoc(this.path, nft.id);
  }

  nuevo(){
    this.EnableNewNft = true;

    this.newNfts ={
      nombre: '',
      precio_normal: null,
      precio_rebajado: null,
      foto: '',
      id: this.firestoreservice.getId(),
      fecha: new Date()
    };
  }
}
