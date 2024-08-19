
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonService } from '../services/json.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule,   CommonModule]
})
export class EditComponent  implements OnInit {

  newsItem: any = {};
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private jsonService: JsonService, private router: Router) {}

  ngOnInit() {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.jsonService.getBlogPosts().subscribe(posts => {
        this.newsItem = posts.find((post: any) => post.id === itemId);
      });
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateBlog() {
    if (this.selectedFile) {
      this.jsonService.uploadImage(this.selectedFile).subscribe(url => {
        this.newsItem.img = url;
        if (this.newsItem.id) {
          this.jsonService.updateBlogPost(this.newsItem.id, this.newsItem).subscribe(() => {
            this.router.navigate(['/']);
          }, error => {
            console.error('Error updating blog post:', error);
          });
        }
      });
    } else {
      if (this.newsItem.id) {
        this.jsonService.updateBlogPost(this.newsItem.id, this.newsItem).subscribe(() => {
          this.router.navigate(['/']);
        }, error => {
          console.error('Error updating blog post:', error);
        });
      }
    }
  }

  //updateBlog() {
  //  if (this.newsItem.id) {
   //   this.jsonService.updateBlogPost(this.newsItem.id, this.newsItem).subscribe(() => {
   //     this.router.navigate(['/']);
   //   }, error => {
   //     console.error('Error updating blog post:', error);
   //   });
   // }
 // }
 // onFileSelected(event: any) {
  //  this.selectedFile = event.target.files[0];
 // }

}
