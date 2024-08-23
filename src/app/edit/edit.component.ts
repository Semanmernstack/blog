
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
  imageUrl: string = ''
  

  constructor(private route: ActivatedRoute, private jsonService: JsonService, private router: Router) {}
  ngOnInit() {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.jsonService.getBlogPostById(itemId).subscribe(post => {
        this.newsItem = post;
        this.imageUrl = post?.image || 'assets/img/placeholder.png';  // Set initial image URL
      });
    }
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      // Show preview of the selected image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  updateBlog() {
    if (this.selectedFile) {
      this.jsonService.uploadImage(this.selectedFile).subscribe(url => {
        this.newsItem.image = url;
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
