import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { JsonService } from 'src/app/services/json.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailsPage implements OnInit {

  newsItem: any = {};

  constructor(private route: ActivatedRoute, private jsonService: JsonService) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.jsonService.getBlogPosts().subscribe(posts => {
        this.newsItem = posts.find((post: any) => post.id === postId);
      });
    }
  }
}


