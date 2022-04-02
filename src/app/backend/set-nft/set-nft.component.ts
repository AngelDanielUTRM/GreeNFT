import { FirestorageService } from './../../services/firestorage.service';
import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { read } from 'fs';
import { Nft } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { fileURLToPath } from 'url';


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

  NewImageUpload='';

  loading: any;

  constructor(public menucontroler: MenuController,
              public firestoreservice: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService
              ) { }

  ngOnInit() {
    this.getNFT();
  }

  openMenu()
  {
    console.log('openMenu');
    this.menucontroler.toggle('principal');
  }

  guardarNFT(){
    this.presentLoading();
    this.firestoreservice.createDoc(this.newNfts,this.path,this.newNfts.id).then( res => {
        this.loading.dismiss();
        this.presentToast('guardado con exito');
    }).catch( error => {
      this.presentToast('no se ha podido guardar');
    });

  }

  getNFT(){
    this.firestoreservice.getCollection<Nft>(this.path).subscribe(res => {
      this.nfts = res;
    });
  }

  async deleteNFT(nft: Nft){

    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: 'seguro desea <strong>eliminar</strong> este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'normal',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.firestoreservice.deleteDoc(this.path, nft.id).then(res => {
              this.loading.dismiss();
              this.presentToast('eliminado con exito');
              this.alertController.dismiss();
            }).catch(error => {
              this.presentToast('No se pudo eliminar')
            })
          }
        }
      ]
    });

    await alert.present();

    //this.firestoreservice.deleteDoc(this.path, nft.id);
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

  async presentLoading() {
   this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'guardando...',
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: 2000,
      color:'light',
    });
    toast.present();
  }

  async NewImage(event: any){
    /*
   if(event.target.files && event.target.files[0]){
     const reader = new FileReader();
      reader.onload = ((image) => {
        this.NewImageUpload = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0])
   }
*/
const res = await this.firestorageService.uploadimage()
console.log('recibi respuesta de la promesa', res)
console.log("fin de la funcion -> NewImage")
  }
}
