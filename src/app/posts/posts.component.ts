import { Component, OnInit, NgModule } from '@angular/core';
import { BlogService } from '../services';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  listBlog: any;

  constructor(private blog: BlogService) { }

  ngOnInit(): void {
    this.blog.getPost().toPromise().then(blog => {
      this.listBlog = blog.data['docs'];
    })
  }

}

import { CommonModule } from '@angular/common';
@NgModule({
  imports: [CommonModule],
  declarations: [PostsComponent],
})
export class PostModule { }