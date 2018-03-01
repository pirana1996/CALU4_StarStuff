import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  remainingSeconds : number;

  constructor() {
  }

  private startTimer(seconds: number){
    setInterval(function () {
      this.remainingSeconds = seconds--;
    },1000);
  }

  ngOnInit() {

    }




}
