import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-date-quote',
  templateUrl: './date-quote.component.html',
  styleUrls: ['./date-quote.component.css'],
})
export class DateQuoteComponent implements OnInit {

  public quotes: DateQuote[];
  public ticker: string;
  public client: HttpClient;
  public initSearch: Boolean;
  public fullURI: string;
  public uri: string = 'http://localhost:8000/api/SystemQuoteGrabberIntervalDate/';
  
  public lineChartData:Array<any> = [
    {data: [], label: ""},
    {data: [], label: ""}
  ];
  
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // greyng generate component 
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
     this.client = http;
  }

  ngOnInit() {
  }

  keyDownFunction(event: KeyboardEvent) {
    if (this.ticker && event.key === 'Enter') {
      this.initSearch = true;
      this.fullURI = this.uri+this.ticker.toUpperCase().trim();
      this.client.get<DateQuote[]>(this.fullURI).subscribe(
        result => {
          this.handleData(result);
          this.initSearch = false;
        }, error => console.error(error));
    }
  }
  handleData(data) {
    this.quotes = data;
    this.lineChartData[0] = {data: [], label: ""};
    this.lineChartData[1] = {data: [], label: ""};
    this.lineChartLabels = [];

    this.quotes.sort((one, two) => (one.dateStamp < two.dateStamp ? -1 : 1));

    for(let quote of this.quotes){
      this.lineChartData[0].data.push(quote.close)
      this.lineChartData[0].label = quote.metaData.symbol+"-Close";
      this.lineChartData[1].data.push(quote.open)
      this.lineChartData[1].label = quote.metaData.symbol+"-Open";

      this.lineChartLabels.push(quote.dateStamp);
    }
  }
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}

interface DateQuote {
    close: number;
    dateStamp: string;
    high: number;
    low: number;
    metaData: MetaData;
    open: number;
    volume: number;
}

interface MetaData {
    info: string;
    lastRefresh: string;
    symbol: string;
    timeZone: string;
}
