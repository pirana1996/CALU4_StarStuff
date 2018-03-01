import { Component, OnInit } from '@angular/core';
import {Post} from "../model/Post";
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {PostManagementService} from "../services/post-management.service";
import {Observable} from "rxjs";
import {Bid} from "../model/Bid";
import {AngularFirestore} from "angularfire2/firestore";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  post: Post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PostManagementService,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        const id = params.get('id');
        return this.service.getPostByIdAsObservable(id);
      })
      .subscribe(post => {
        this.post = post;
      });
  }

}
