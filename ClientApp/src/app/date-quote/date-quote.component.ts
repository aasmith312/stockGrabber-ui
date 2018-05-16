import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-date-quote',
  templateUrl: './date-quote.component.html',
  styleUrls: ['./date-quote.component.css']
})
export class DateQuoteComponent implements OnInit {
  public quotes: DateQuote[];
  public data: Object[];
  public hasData: Boolean;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Object[]>('http://localhost:5001/api/SystemQuoteGrabberIntervalDate/').subscribe(result => {
      this.data = result;
    }, error => console.error(error));
    if (this.data && this.data.length > 0) {
      this.hasData = true;
    }
  }

  ngOnInit() {
  }
}


interface DateQuote {
    closePrice: number;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    date: string;
    volume: number;
}
