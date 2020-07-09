import { Component, OnInit } from '@angular/core';
import { ApexChartService } from 'src/app/theme/shared/components/chart/apex-chart/apex-chart.service';
import { ChartDB } from 'src/app/fack-db/chart-data';
import { PublicacionService } from 'src/app/servicesComponents/publicacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public chartDB: any;
  public query:any = { where:{ 
    estado: ['activo', 'consumido'],
    autocreo: false,
    type: ['img', 'url']
   }, 
   sort: "createdAt DESC",
   limit: 30,
   page: 0
  };
  config:any = {
    vista: "publicacion"
  };
  
  constructor(
    public apexEvent: ApexChartService,
    public _publicacion: PublicacionService,
  ) { 
    this.chartDB = ChartDB;
  }

  ngOnInit() {
  }

}
