import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sector-quote',
  templateUrl: './sector-quote.component.html',
  styleUrls: ['./sector-quote.component.css']
})
export class SectorQuoteComponent implements OnInit {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public data: SectorData;
  public client: HttpClient;
  public fullURI: string;
  public uri: string = 'http://demostockgrabberapi-dev.us-east-2.elasticbeanstalk.com/api/SectorPerformance/';

  public realTimePerformanceLineChartData: Array<any> = null;
  public realTimePerformanceLineChartLabels: string[] = null;
  public realTimePerformanceLineChartNames: Array<any> = [{ names: ["Real-Time"] }];

  public oneDayPerformanceLineChartData: Array<any> = null;
  public oneDayPerformanceLineChartLabels: string[] = null;
  public oneDayPerformanceLineChartNames: Array<any> = [{ names: ["One-Day"] }];

  public fiveDayPerformanceLineChartData: Array<any> = null;
  public fiveDayPerformanceLineChartLabels: string[] = null;
  public fiveDayPerformanceLineChartNames: Array<any> = [{ names: ["Five-Day"] }];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.client = http;

    this.client.get<SectorData[]>(this.uri).subscribe(
      result => {
        this.handleData(result);
      }, error => console.error(error));

  }

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {

  }
  resetArrays() {
    this.realTimePerformanceLineChartData = [];
    this.realTimePerformanceLineChartLabels = [];

    this.oneDayPerformanceLineChartData = [];
    this.oneDayPerformanceLineChartLabels = [];

    this.fiveDayPerformanceLineChartData = [];
    this.fiveDayPerformanceLineChartLabels = [];


  }
  handleChartLabels(label: string) {

    if (label.includes("Rank A"))
      this.realTimePerformanceLineChartLabels.push(label);
    else if (label.includes("Rank B"))
      this.oneDayPerformanceLineChartLabels.push(label);
    else if (label.includes("Rank C"))
      this.fiveDayPerformanceLineChartLabels.push(label);

  }
  handlePerformanceLineChartData(label: string, sectorName: string, data: Array<string>) {
    if (label.includes("Rank A"))
      this.realTimePerformanceLineChartData.push({ label: sectorName, data: data });
    else if (label.includes("Rank B"))
      this.oneDayPerformanceLineChartData.push({ label: sectorName, data: data });
    else if (label.includes("Rank C"))
      this.fiveDayPerformanceLineChartData.push({ label: sectorName, data: data });
  }

  handleData(data: SectorData[]): void {
    this.resetArrays();

    for (let valueOuter of data) {
      this.handleChartLabels(valueOuter.rankName);

      var tmpData: Array<string> = [];
      for (let valueInner of valueOuter.values) {
        tmpData.push(valueInner.percent);
        this.handlePerformanceLineChartData(valueOuter.rankName, valueInner.sectorName, tmpData);
        tmpData = [];
      }
      //break;
    }
  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}

interface SectorData {
  rankName: string,
  values: Array<SectorToValuePair>
}

interface SectorToValuePair {
  sectorName: string,
  percent: string
}
