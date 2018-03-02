import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {PostManagementService} from "../services/post-management.service";
import {Post} from "../model/Post";
import {UserManagementService} from "../services/user-management.service";
import {Observable} from "rxjs";
import {User} from "../model/User";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {

  canAdd: boolean; // whether the post can be added
  postForm: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  constructor(private fb: FormBuilder,
              private service: PostManagementService,
              private userService: UserManagementService,
              private router: Router,
              private location: Location) {
    this.canAdd = true;
  }

  createForm() {
    this.postForm = this.fb.group({
      startPrice: '',
      currentBid: '',
      title: '',
      description: '',
      imageUrl: '',
      startDate: '',
      endDateTime: '',
    });
  }

  // These will be used for validation in the template
  get getStartPrice() {
    return this.postForm.get('startPrice');
  }

  get getUser() {
    return this.postForm.get('user');
  }

  prepareSaveStudent(): Post {
    const formModel = this.postForm.value;
    const startPrice: number = formModel.startPrice as number;
    const currentBid: number = 0;
    let userObject: User;
    this.userService.getActiveUser().subscribe(u => userObject = u);
    const user : number = +userObject.uid;
    const title: string = formModel.title as string;
    const description: string = formModel.description as string;
    const imageUrl: string = formModel.imageUrl as string;
    const startDate: Date = formModel.startDate as Date;
    const endDateTime: Date = formModel.endDateTime as Date;
    return new Post(startPrice, currentBid, user, title, description, imageUrl, startDate, endDateTime);
  }

  onSave() {
    const post: Post = this.prepareSaveStudent();
    // console.log(JSON.stringify(s));
    // we must subscribe because addPost() sends post method which is idempotent
    this.service.addPost(post)
      .subscribe(() => {
        this.router.navigateByUrl('/posts/list');
      });
  }

  revertForm() {
    this.postForm.value.startPrice = '';
    this.postForm.value.currentBid = '';
    this.postForm.value.user = '';
    this.postForm.value.title = '';
    this.postForm.value.description = '';
    this.postForm.value.imageUrl = '';
    this.postForm.value.startDate = '';
    this.postForm.value.endDateTime = '';
  }

  back(): void {
    this.location.back();
  }

}
