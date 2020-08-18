import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.scss']
})
export class PortadaComponent implements OnInit {
  
  urlTerminos: string = environment.urlFront+"/portada/terminos";
  urlPagos:string = environment.urlFront+"/portada/configurarpagos";

  constructor() { }

  ngOnInit() {
  }

}
