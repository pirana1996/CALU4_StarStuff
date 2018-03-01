import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/User';
import {Bid} from "../model/Bid";

@Injectable()
export class BidManagementService {

  bidsCollection: AngularFirestoreCollection<Bid>;
  bids: Observable<Bid[]>;

  constructor(private afs: AngularFirestore) {
    this.bidsCollection = this.afs.collection('Bid');
  }

  public getBidListAsObservable(): Observable<Bid[]> {
    return this.bidsCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const id = +action.payload.doc.id;
        const data = action.payload.doc.data() as Bid;
        return {id, ...data};
      });
    });
  }

  getBidsByPostIdAsObservable(id: string): Observable<Bid[]> {
    const queryOnCollection = this.afs.collection('Bid', ref => ref.where('id_post', '==', String(id)));
    return queryOnCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const id = +action.payload.doc.id;
        const data = action.payload.doc.data() as Bid;
        return {id, ...data};
      });
    });
  }

  public addBidEntry(bid: Bid): void {
    this.bidsCollection.add({email: bid.email, price: bid.price, id_post: bid.id_post, id_user: bid.id_user});
  }

}
