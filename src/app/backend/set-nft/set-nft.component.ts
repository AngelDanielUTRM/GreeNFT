import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-set-nft',
  templateUrl: './set-nft.component.html',
  styleUrls: ['./set-nft.component.scss'],
})
export class SetNftComponent implements OnInit {

  constructor(public menucontroler: MenuController) { }

  ngOnInit() {}

  openMenu()
  {
    console.log('openMenu');
    this.menucontroler.toggle('principal');
  }
}
