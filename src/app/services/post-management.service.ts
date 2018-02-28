import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {User} from "../model/User";
import {Post} from "../model/Post";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PostManagementService implements OnInit {

  usersCollectionRef: AngularFirestoreCollection<User>;
  postsCollectionRef: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  users: Observable<User[]>;
  postRef: AngularFirestoreDocument<Post>;

  ngOnInit(): void {
    this.usersCollectionRef = this.afs.collection('User');
    this.postsCollectionRef = this.afs.collection('Post');
    this.posts = this.postsCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const id = +action.payload.doc.id;
        const data = action.payload.doc.data() as Post;
        return {id, ...data};
      });
    });
  }

  constructor(private afs: AngularFirestore) {
  }

  public getPostListAsObservable(): Observable<Post[]> {
    return this.posts;
  }

  getPostById(id: string): Observable<Post> {
    return this.afs.doc('Post/' + id).valueChanges();
  }

}
