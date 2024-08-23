
import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, setDoc, writeBatch } from '@angular/fire/firestore';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  category: string;
  img: string;
  snippet: string;
  date: string;
  desciption: string;
  image: string;
}


@Injectable({
  providedIn: 'root'
})
export class JsonService {

  private blogCollection = collection(this.firestore, 'blogs');

  constructor(private firestore: Firestore, private storage: Storage) {}

  // Get all blog posts
  getBlogPosts(): Observable<BlogPost[]> {
    return collectionData(this.blogCollection, { idField: 'id' }) as Observable<BlogPost[]>;
  }

  // Add a new blog post
  addBlogPost(blogPost: BlogPost): Observable<any> {
    const promise = addDoc(this.blogCollection, blogPost);
    return from(promise);
  }

  // Update an existing blog post
  updateBlogPost(id: string, blogPost: BlogPost): Observable<any> {
    const blogDocRef = doc(this.firestore, `blogs/${id}`);
    const promise = setDoc(blogDocRef, blogPost, { merge: true });
    return from(promise);
  }

  // Delete a blog post
  deleteBlogPost(id: string): Observable<any> {
    const blogDocRef = doc(this.firestore, `blogs/${id}`);
    const promise = deleteDoc(blogDocRef);
    return from(promise);
  }

  // Synchronize posts from an API (if needed)
  syncPostsToFirestore(posts: BlogPost[]): Observable<any> {
    return from(this.batchUpdatePosts(posts)).pipe(
      catchError(error => {
        console.error('Error syncing posts:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  private async batchUpdatePosts(posts: BlogPost[]): Promise<void> {
    const batch = writeBatch(this.firestore);

    posts.forEach(post => {
      const postRef = doc(this.blogCollection, post.id ?? '');
      batch.set(postRef, post);
    });

    await batch.commit();
  }

  uploadImage(file: File): Observable<string> {
    const filePath = `images/${file.name}`;
    const imageRef = ref(this.storage, filePath);
    return from(uploadBytes(imageRef, file)).pipe(
      switchMap(() => getDownloadURL(imageRef)),
      catchError(error => {
        console.error('Error uploading image:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  getBlogPostById(id: string): Observable<BlogPost | undefined> {
    const blogDocRef = doc(this.firestore, `blogs/${id}`);
    return from(getDoc(blogDocRef)).pipe(
      map(docSnap => docSnap.exists() ? (docSnap.data() as BlogPost) : undefined),
      catchError(error => {
        console.error('Error fetching blog post:', error);
        return throwError(() => new Error(error));
      })
    );
  }
  
}
