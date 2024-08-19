import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSearchbar, IonText, IonLabel, IonCard, IonThumbnail, IonItem, IonCol, IonRow,  IonImg } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { JsonService } from '../services/json.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [  IonTitle, IonHeader,  IonButton,  RouterLink, RouterOutlet, IonToolbar, IonThumbnail, IonSearchbar, IonItem, IonText, IonLabel, IonCard,  IonCol, IonImg, IonRow, IonTitle, IonContent, CommonModule, NgFor],
})
export class HomePage implements OnInit {
  blogPosts: any[] = [];
  
  constructor(private jsonService: JsonService) {}

  ngOnInit() {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.jsonService.getBlogPosts().subscribe(posts => {
      this.blogPosts = posts;
    }, error => {
      console.error('Error fetching blog posts:', error);
    });
  }

  deletePost(postId: string) {
    this.jsonService.deleteBlogPost(postId).subscribe(() => {
      this.blogPosts = this.blogPosts.filter(post => post.id !== postId);
    }, error => {
      console.error('Error deleting blog post:', error);
    });
  }
}
