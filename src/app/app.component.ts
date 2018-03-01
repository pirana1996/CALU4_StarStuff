import {Component, OnInit} from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
// import {User} from "./model/User";
import {Post} from "./model/Post";
import {User} from "./model/User";
import {AuthService} from "./core/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  postsCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  filteredResult: Observable<Post[]>;
  postArray: {}[];

  user: User;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
  }

  ngOnInit() {
    this.usersCollection = this.afs.collection('User');
    this.users = this.usersCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const id = +action.payload.doc.id;
        const data = action.payload.doc.data() as User;
        return {id, ...data};
      });
    });

    this.postsCollection = this.afs.collection('Post');
    this.authService.user.subscribe(user => this.user = user);

  }

  onBtnClick(id: number) {
    // const docRef = this.afs.collection('User').doc('1');
    this.usersCollection.doc(String(id)).ref.get().then(function (doc) {

      if (doc.exists) {
        console.log('Postoi');
      } else {
        console.log('NAJN!');
      }
    });

    this.findPostsById(id);
  }

  findPostsById(id: number) {
    // const reference = this.postsCollection.doc('1');

    const queryOnCollection = this.afs.collection('Post', ref => ref.where('user', '==', String(id)));
    //this.filteredResult = queryOnCollection.valueChanges().subscribe(postsTmp => this.posts = postsTmp);
    queryOnCollection.valueChanges().subscribe(postsTmp => {
    this.postArray = postsTmp as Array<{}>;
      console.log(this.postArray);
    });

  }
}
