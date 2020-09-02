import { Component, OnInit } from '@angular/core';
import { FleteService } from 'src/app/servicesComponents/flete.service';

@Component({
  selector: 'app-relacion-despacho',
  templateUrl: './relacion-despacho.component.html',
  styleUrls: ['./relacion-despacho.component.scss']
})
export class RelacionDespachoComponent implements OnInit {
  
  listRow:any = [];
  public query:any = { 
    where:{ }, 
    sort: "createdAt DESC",
    page: 0
  };

  constructor(
    private _flete: FleteService,
  ) { }

  ngOnInit() {
    this.getRow();
  }

  getRow(){
    this._flete.get( this.query ).subscribe(( res:any )=>{
      this.listRow = res.data;
    });
  }

}
