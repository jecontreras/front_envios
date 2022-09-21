import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cotizar-guia',
  templateUrl: './cotizar-guia.component.html',
  styleUrls: ['./cotizar-guia.component.scss']
})
export class CotizarGuiaComponent implements OnInit {
  
  dataConfig:any = {
    vista: "publico"
  };

  constructor() { }

  ngOnInit() {
  }

}
