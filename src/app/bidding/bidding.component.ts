import {Component, Input, OnInit} from '@angular/core';
import {BidManagementService} from '../services/bid-management.service';
import {Observable} from 'rxjs/Observable';
import {Post} from '../model/Post';
import {User} from '../model/User';
import {Bid} from '../model/Bid';
import {UserManagementService} from '../services/user-management.service';
import {PostManagementService} from "../services/post-management.service";

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

  constructor(private service: BidManagementService, private userService: UserManagementService, private postService: PostManagementService) { }

  ngOnInit() {
    this.newBidEntry = this.parentPost.currentBid + 1;
    this.service.getBidsByPostIdAsObservable(String(this.parentPost.id))
      .subscribe(bid => this.bids = bid.sort((a, b) => b.price - a.price));
  }

  bidEntry() {
    let postId;
    let userId;
    let userEMail;
    let price;
    let userName;
    let userPhoto;
    this.userService.getActiveUser().subscribe(curUser => {
      postId = this.parentPost.id;
      userId = curUser.uid;
      userEMail = curUser.email;
      userName = curUser.displayName;
      userPhoto = curUser.photoURL;
      price = this.newBidEntry;
      this.parentPost.currentBid = this.newBidEntry;
      console.log(postId + ' ' + userId + ' ' + userEMail + ' ' + price);

      this.service.addBidEntry(new Bid(postId, userId, price, userEMail));
      this.postService.updatePost(this.parentPost);
      this.newBidEntry = this.parentPost.currentBid + 1;
    });
  }
}
