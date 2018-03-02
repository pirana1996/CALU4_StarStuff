import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PostListComponent} from "../post-list/post-list.component";
import {PostDetailsComponent} from "../post-details/post-details.component";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";

import {BiddingComponent} from "../bidding/bidding.component";

import {UserProfileComponent} from "../user-profile/user-profile.component";
import {LoginComponent} from "../login/login.component";
import {PostCreateComponent} from "../post-create/post-create.component";


const appRoutes: Routes = [
  { path: 'posts/list', component: PostListComponent },
  // { path: 'posts/bidding', component: BiddingComponent },
  { path: 'post/details/:id', component:  PostDetailsComponent },
  { path: 'post/create', component: PostCreateComponent},
  { path: 'login', component:  LoginComponent },
  { path: 'profile', component:  UserProfileComponent },
  { path: '',   redirectTo: 'posts/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
