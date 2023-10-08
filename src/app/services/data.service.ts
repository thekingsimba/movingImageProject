import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API, BEST_QUALITY } from '../constants';
import { Author, Category, DataFromDeleteSubject, FormatObject, ProcessedVideo, Video } from '../models/interfaces';
import { BehaviorSubject, Observable, catchError, map, mergeMap, of, switchMap, tap, throwError } from 'rxjs';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { CategoriesStateModel } from '../categories-store/categories.state';
import { SetCategoriesData } from '../categories-store/categories.actions';
import { addBestFormat } from './utils';


@Injectable({
  providedIn: 'root',
})
export class DataService {


  private deleteModalSubject = new BehaviorSubject<DataFromDeleteSubject | null>(null);
  private addNewButtonSubject = new BehaviorSubject<boolean>(true);

  detailsToDelete$: Observable<DataFromDeleteSubject | null>

  addNewButtonStatus$: Observable<boolean>


  categoriesList: Category[] = [];

  constructor(
    private http: HttpClient,
    private store: Store
  ) {
    this.detailsToDelete$ = this.deleteModalSubject.asObservable();
    this.addNewButtonStatus$ = this.addNewButtonSubject.asObservable();
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API}/categories`);
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${API}/authors`);
  }

  getOneAuthor(authorId: number): Observable<Author> {
    return this.http.get<Author>(`${API}/authors/${authorId}`);
  }

  getVideos(): Observable<ProcessedVideo[]> {

    return this.getCategories().pipe(
      switchMap((result) => {
        // avoid multiple API call while setting up categories, then we take categories from store
        this.store.dispatch(new SetCategoriesData(result));

        // Get the Authors and iterate over the videos inside each one. Add the missing information to get a ProcessedVideo
        return this.processVideoData();
      })
    )
  }

  addOrEditVideo(authorData: Author, authorID: number): Observable<Author> {
    return this.http.put<Author>(`${API}/authors/${authorID}`, authorData);
  }

  updateModalDataToDelete(newData: DataFromDeleteSubject | null) {
    this.deleteModalSubject.next(newData);
  }

  updateAddNewButtonStatus(newStatus: boolean) {
    this.addNewButtonSubject.next(newStatus);
  }

  deleteVideo(authorData: Author, videoId: number, authorID: number): Observable<{ deleted: boolean }> {
    return this.getOneAuthor(authorID).pipe(
      switchMap((result) => {

        // remove the concerned video
        const remainingVideo = result.videos.filter(video => video.id != videoId)
        authorData.videos = remainingVideo;

        // save author
        return this.addOrEditVideo(authorData, authorID).pipe(
          switchMap((result) => {
            // this ensure that the remaining data are really saved
            return of({ deleted: true })
          }),
          catchError((error) => {
            // Handle and log errors here
            console.error('Error deleting video', error);
            return throwError('Failed to delete video');
          })

        )
      }),
      catchError((error) => {
        // Handle and log errors here
        console.error('Error fetching author data', error);
        return throwError('Failed to fetch author data');
      })
    )
  }

  processVideoData() {
    // Get the Authors and iterate over the videos inside each one. Then return only videos
    return this.getAuthors().pipe(
      map((authors: Author[]) => {
        const videosList: ProcessedVideo[] = [];

        authors.forEach(author => {
          author.videos.forEach(video => {
            const processedVideo: ProcessedVideo = {
              id: video.id,
              name: video.name,
              author: author.name,
              authorId: author.id,
              categories: this.addCategoryName(video.catIds),
              bestFormat: addBestFormat(video.formats),
              releaseDate: video.releaseDate
            };

            videosList.push(processedVideo);
          });
        });

        return videosList;
      })
    )
  }

  addCategoryName(categoriesIds: number[]) {

    this.store.select(state => state.categories).subscribe(
      (data: CategoriesStateModel) => {
        this.categoriesList = data.categoriesLists;
      }
    );

    const currentVideoCategories = this.categoriesList.filter((category) => {
      return categoriesIds.includes(category.id)
    })

    return currentVideoCategories.map((category) => category.name);
  }




}
