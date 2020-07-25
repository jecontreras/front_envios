import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MerkaplaceService } from 'src/app/servicesComponents/merkaplace.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin-marketplace',
  templateUrl: './admin-marketplace.component.html',
  styleUrls: ['./admin-marketplace.component.scss']
})
export class AdminMarketplaceComponent implements OnInit {
  
  listPublicacion:any = [];
  query:any = {
    where: {},
    sort: "createdAt DESC"
  };
  count:number = 0;
  progreses:boolean = true;

  constructor(
    private Router: Router,
    private _merkaplace: MerkaplaceService
  ) { }

  ngOnInit() {
    this.getRow();
  }

  onScroll(){

  }

  getRow(){
    this.progreses = true;
    this._merkaplace.get( this.query ).subscribe( ( res:any )=>{
      this.count = res.count;
      this.listPublicacion = _.unionBy( this.listPublicacion || [], res.data, 'id' );
      this.progreses = false;
    },(error)=> { this.progreses = false; } );
  }

  openCrear( item:any = false ){
    if( item ) this.Router.navigate( [ "/dashboard/formadminmarketplace", item.id ]);
    else this.Router.navigate( [ "/dashboard/formadminmarketplace" ]);
  }

}
