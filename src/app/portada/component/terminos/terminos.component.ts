import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.scss']
})
export class TerminosComponent implements OnInit {

  urlFront: string = environment.urlFront+"/portada/terminos";

  constructor() { }

  ngOnInit() {
  }

}
