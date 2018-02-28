import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
// import {User} from "./model/User";
import {Post} from "../model/Post";
import {PostManagementService} from "../services/post-management.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[];

  constructor(private postManagement: PostManagementService) {
  }

  ngOnInit() {
    console.log("init post list");
    this.postManagement.getPostListAsObservable().subscribe(
      post => this.posts = post as Array<Post>
    );
    console.log(this.posts);
  }

}
