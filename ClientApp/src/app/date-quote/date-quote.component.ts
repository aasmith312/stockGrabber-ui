import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
     this.client = http;
  }

  ngOnInit() {
  }

  keyDownFunction(event: KeyboardEvent) {
    if (this.ticker && event.key === 'Enter') {
      this.initSearch = true;
      const tmpURI = 'http://demostockgrabberapi-dev.us-east-2.elasticbeanstalk.com/api/SystemQuoteGrabberIntervalDate/';
      this.client.get<DateQuote[]>(tmpURI + this.ticker.toUpperCase()).subscribe(
        result => {
          this.handleData(result);
          this.initSearch = false;
        }, error => console.error(error));
    }
  }
  handleData(data) {
    this.quotes = data;
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
