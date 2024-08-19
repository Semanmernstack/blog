
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';

import { CommonModule, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {  IonToolbar, IonTitle, IonSearchbar, IonText,  IonLabel, IonCard, IonTextarea, IonInput,  IonThumbnail, IonItem, IonCol, IonRow, IonButton,  IonImg } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { JsonService } from '../services/json.service';


@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule,   CommonModule]
})
export class AddFormComponent  implements OnInit {
  category = ['News', 'Entertainment', 'Sport'];
  newsItem: any = {
    
    id: uuidv4(),
    title: '',
    description: '',
    category: this.category[0],
    image: ''
   
  };
  
  selectedFile: File | null = null;
  

  constructor(private router: Router, private jsonService: JsonService) {}

  ngOnInit() {}
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  //createBlog() {
  //  this.jsonService.addBlogPost(this.newsItem).subscribe(() => {
  //    this.router.navigate(['/']);
  //  }, error => {
 //     console.error('Error adding blog post:', error);
  //  });
 // }
 createBlog() {
  if (this.selectedFile) {
    this.jsonService.uploadImage(this.selectedFile).subscribe(url => {
      this.newsItem.image = url;
      this.jsonService.addBlogPost(this.newsItem).subscribe(() => {
        this.router.navigate(['/']);
      }, error => {
        console.error('Error adding blog post:', error);
      });
    });
  } else {
    this.jsonService.addBlogPost(this.newsItem).subscribe(() => {
      this.router.navigate(['/']);
    }, error => {
      console.error('Error adding blog post:', error);
    });
  }
}

}
