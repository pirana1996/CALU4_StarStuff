import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Post} from '../model/Post';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {PostManagementService} from '../services/post-management.service';
// import {Observable} from "rxjs";
// import {Bid} from "../model/Bid";
import {AngularFirestore} from 'angularfire2/firestore';
// import {CountdownTimerComponent} from "../countdown-timer/countdown-timer.component";
// import timer =
import {map, take} from 'rxjs/operators';
import {timer} from 'rxjs/observable/timer';
import * as firebase from 'firebase/firestore';
import {toNumber} from "ngx-bootstrap/timepicker/timepicker.utils";


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, AfterViewInit {

  post: Post;

  countDown;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  count = 60;

  ngAfterViewInit(): void {
    this.countDown = timer(0, 1000).pipe(
      take(this.count),
      map(() => {
        const seconds = this.count - 1;
        this.days        = Math.floor(seconds / 24 / 60 / 60);
        const hoursLeft   = Math.floor((seconds) - (this.days * 86400));
        this.hours       = Math.floor(hoursLeft / 3600);
        const minutesLeft = Math.floor((hoursLeft) - (this.hours * 3600));
        this.minutes     = Math.floor(minutesLeft / 60);
        this.seconds = seconds % 60;
        console.log();
        return --this.count;

        }
      )
    );

  }



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PostManagementService,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    let id;
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        id = params.get('id');
        return this.service.getPostByIdAsObservable(id);
      })
      .subscribe(post => {
        this.post = post;
        this.post.id = id;
        this.count = Math.round(this.post.endDateTime.getTime() / 1000 - new Date().getTime() / 1000);
        // this.minutes = this.count / 60;
        // console.log(this.post.endDateTime - new Date());
      });
  }




}
