import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { cliente } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  cliente: cliente ={
    uid: '',
    nombre: '',
    emial: '',
    celular: '',
    foto: '',
    referencia: '',
    ubicacion: null,
  }
  NewFile:any;

  constructor(public menucontroler: MenuController,
    public firebaseauthService:FirebaseauthService,
    public firestoreService: FirestoreService,
    public firestorageService: FirestorageService) { }

  async ngOnInit() {
      const uid = await this.firebaseauthService.getuid();
      console.log(uid);
  }

  openMenu()
  {
    console.log('openMenu');
    this.menucontroler.toggle('principal');
  }

  async NewImage(event: any){

    if(event.target.files && event.target.files[0]){
      this.NewFile = event.target.files[0];
      const reader = new FileReader();
       reader.onload = ((image) => {
         this.cliente.foto = image.target.result as string;
       });
       reader.readAsDataURL(event.target.files[0])
    }

   }

   async registrarse(){
      const credenciales = {
        email: this.cliente.emial,
        password: this.cliente.celular,
      };

      const res = await this.firebaseauthService.registrar(credenciales.email,credenciales.password).catch(err =>{
        console.log("error ->",  err);
      });
      const uid = await this.firebaseauthService.getuid();
      this.cliente.uid = uid;
      this.guardarUSER();
      console.log(uid);
   }

   async salir(){
   // const uid = await this.firebaseauthService.getuid();
   // console.log(uid);

     this.firebaseauthService.logout();
   }

   async guardarUSER(){
    const path = "clientes";
    const name = this.cliente.nombre;
    const res = await this.firestorageService.uploadimage(this.NewFile, path, name)
    this.cliente.foto = res
    this.firestoreService.createDoc(this.cliente,path,this.cliente.uid).then( res => {
        console.log("Guardado con exito");
    }).catch( error => {
    });

  }

}
