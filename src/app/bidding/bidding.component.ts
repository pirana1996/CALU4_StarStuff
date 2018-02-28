import { Component, OnInit } from '@angular/core';
import {BidManagementService} from "../services/bid-management.service";
import {Observable} from "rxjs/Observable";
import {Post} from "../model/Post";
import {User} from "../model/User";
import {Bid} from "../model/Bid";

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit {
  bids: Observable<Bid[]>;

  constructor(private service: BidManagementService) { }

  ngOnInit() {
      this.bids = this.service.getBids();
  }

}
