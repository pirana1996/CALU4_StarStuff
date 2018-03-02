import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {User} from "../model/User";
import {Post} from "../model/Post";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PostManagementService {

  upcomingPosts : Post[];
  usersCollectionRef: AngularFirestoreCollection<User>;
  postsCollectionRef: AngularFirestoreCollection<Post>;
  postRef: AngularFirestoreDocument<Post>;

  constructor(private afs: AngularFirestore) {
    this.usersCollectionRef = this.afs.collection('User');
    this.postsCollectionRef = this.afs.collection('Post');
  }

  public getPostListAsObservable(): Observable<Post[]> {
    return this.postsCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const id = +action.payload.doc.id;
        const data = action.payload.doc.data() as Post;
        return {id, ...data};
      });
    });
  }

  // public getPostListAsObservableUpcoming(): Post[] {
  //
  //   this.getPostListAsObservable().subscribe(
  //     post => this.upcomingPosts = post as Array<Post>);
  //
  //   this.upcomingPosts.filter(p => p.startDate < new Date());
  //   return this.upcomingPosts;
  // }



  getPostByIdAsObservable(id: string): Observable<Post> {
    return this.afs.doc('Post/' + id).valueChanges();
  }

  getPostsByUserIdAsObservable(id: string): Observable<Post[]> {
    const queryOnCollection = this.afs.collection('Post', ref => ref.where('user', '==', String(id)));
    return queryOnCollection.valueChanges();
  }

  public updatePost(post: Post) {
    this.postsCollectionRef.doc(String(post.id)).set({ currentBid: post.currentBid, description: post.description,
      imageUrl: post.imageUrl, startPrice: post.startPrice, title: post.title, user: post.user, endDateTime: post.endDateTime});
  }

}
