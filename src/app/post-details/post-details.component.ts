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

  //tmp
  bids: Bid[];

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

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        const id = params.get('id');
        return this.getBidsByPostIdAsObservable(id);
      })
      .subscribe(bids => {
        this.bids = bids;
      });

  }

  // TEMPORARY SHOULD BE TRANSFERED IN BID MANAGEMENT SERVICE
  public getBidsByPostIdAsObservable(id: string): Observable<Bid[]> {
    const queryOnCollection = this.afs.collection('Bid', ref => ref.where('id_user', '==', id));
    return queryOnCollection.valueChanges();
  }
}
