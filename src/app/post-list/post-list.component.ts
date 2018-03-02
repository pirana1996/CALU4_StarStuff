import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
// import {User} from "./model/User";
import {Post} from "../model/Post";
import {PostManagementService} from "../services/post-management.service";
import {CountdownTimerComponent} from "../countdown-timer/countdown-timer.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, AfterViewInit {

  posts: Post[];
  router: Router;
  postType: boolean;
  @ViewChild(CountdownTimerComponent)
  private timerComponent: CountdownTimerComponent;

  constructor(private postManagement: PostManagementService,
              router: Router) {
  }

  ngOnInit() {
    console.log("init post list");
    if(this.router.url.endsWith("trending")){
      this.postManagement.getPostListAsObservable().subscribe(
        post => this.posts = post as Array<Post>
      );
    }else if(this.router.url.endsWith("upcoming")){
      this.postManagement.getPostListAsObservable().subscribe(
        post => this.posts = post as Array<Post>
      );
    }

    console.log(this.posts);
    this.postType = true;
  }




  seconds(): number { return 0; }

  ngAfterViewInit() {
    setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
  }

  start() {
    this.timerComponent.start();
  }

  stop() {
    this.timerComponent.stop();
  }
}
