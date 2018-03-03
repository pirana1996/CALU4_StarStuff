import {Component, Input, OnInit} from '@angular/core';
import {BidManagementService} from '../services/bid-management.service';
import {Observable} from 'rxjs/Observable';
import {Post} from '../model/Post';
import {User} from '../model/User';
import {Bid} from '../model/Bid';
import {UserManagementService} from '../services/user-management.service';
import {PostManagementService} from '../services/post-management.service';

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit {
  newBidEntry: number;
  bids: Bid[];

  @Input()
  parentPost: Post;

  @Input()
  timerOver: boolean;

  constructor(private service: BidManagementService, private userService: UserManagementService,
              private postService: PostManagementService) { }

  ngOnInit() {
    this.newBidEntry = this.parentPost.currentBid + 1;
    this.service.getBidsByPostIdAsObservable(String(this.parentPost.id))
      .subscribe(bid => {
        this.bids = bid.sort((a, b) => b.price - a.price);
        // console.log(this.bids[0].photoURL);
        if (this.bids.length > 0) { this.newBidEntry = this.bids[0].price + 1; }
      });
  }

  bidEntry() {
    this.newBidEntry  = Number(this.newBidEntry);
    let postId;
    let userId;
    let userEMail;
    let price;
    let userName;
    let userPhoto;
    this.userService.getActiveUser().subscribe(curUser => {
      postId = this.parentPost.id;
      userEMail = curUser.email;
      userId = curUser.uid;
      userName = curUser.displayName;
      userPhoto = curUser.photoURL;
      price = this.newBidEntry;

      console.log(postId + ' ' + userId + ' ' + userEMail + ' ' + price);

      if (Number(this.parentPost.currentBid) < Number(price)) {
        this.parentPost.currentBid = this.newBidEntry;
        this.service.addBidEntry(new Bid(postId, userId, price, userEMail, userPhoto, userName));
        this.postService.updatePost(this.parentPost);
      }
      // this.newBidEntry = this.parentPost.currentBid + 1;
    });
  }
}
