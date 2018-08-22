import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  dateTime: Date;
  date: {year: number, month: number};
  
  readings = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    
  }
  
  getPm2Data(): void {
    let date_time = JSON.stringify(this.dateTime);
    date_time = date_time.replace(/"/g,"");

    date_time = date_time.substr(0,date_time.lastIndexOf('.')); //Contains date and time - returns only 1 reading
    let date = date_time.substr(0,date_time.lastIndexOf('T'));  //Contains only date - returns an array of reading for the day
    
    /* Call and wait for the response from the api request.
    Set 2nd Argument as false if the 1st Argument is date_time */
    this.appService.getPmReadings(date, true)
      .subscribe(resp => {
        this.readings = resp.items;
      })
  }

}
