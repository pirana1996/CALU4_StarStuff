import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/User';
import {Bid} from "../model/Bid";

@Injectable()
export class BidManagementService {

  usersCollection: AngularFirestoreCollection<Bid>;
  users: Observable<Bid[]>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('Bid');
  }

  public getBids(): Observable<Bid[]> {
    return this.usersCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const id = +action.payload.doc.id;
        const data = action.payload.doc.data() as Bid;
        return {id, ...data};
      });
    });
  }

}
