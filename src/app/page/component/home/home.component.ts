import { Component, OnInit } from '@angular/core';
import { ApexChartService } from 'src/app/theme/shared/components/chart/apex-chart/apex-chart.service';
import { ChartDB } from 'src/app/fack-db/chart-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public chartDB: any;

  constructor(
    public apexEvent: ApexChartService
  ) { 
    this.chartDB = ChartDB;
  }

  ngOnInit() {
  }

}
