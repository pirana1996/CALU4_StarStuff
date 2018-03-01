import {Component, Input, OnInit} from '@angular/core';
import {BidManagementService} from '../services/bid-management.service';
import {Observable} from 'rxjs/Observable';
import {Post} from '../model/Post';
import {User} from '../model/User';
import {Bid} from '../model/Bid';
import {UserManagementService} from '../services/user-management.service';

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit {
  bids: Bid[];

  @Input()
  parentPost: Post;

  constructor(private service: BidManagementService, private userService: UserManagementService) { }

  ngOnInit() {
      this.service.getBidListAsObservable().subscribe(bid => this.bids = bid.sort((a, b) => b.price - a.price));
  }

  bidEntry(newBidEntry: number) {
    // let user: User;
    let postId;
    let userId;
    let userEMail;
    let price;
    this.userService.getActiveUser().subscribe(curUser => {
      postId = this.parentPost.id;
      userId = curUser.uid;
      userEMail = curUser.email;
      price = newBidEntry;

      console.log(postId + ' ' + userId + ' ' + userEMail + ' ' + price);

      this.service.addBidEntry(new Bid(postId, userId, price, userEMail));
    });
  }
}
