import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit {

  intervalId = 0;
  seconds = 11;

  clearTimer() {
    clearInterval(this.intervalId);
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  ngOnInit(): void {
    this.start();
  }

  start() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds < 0) {
        this.seconds = 10;
      } // reset
    }, 1000);
  }

  stop() {
    this.clearTimer();
  }

}
