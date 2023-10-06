import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API } from '../constants';
import { Author, Category, ProcessedVideo, Video, formatObject } from '../models/interfaces';
import { Observable, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { CategoriesStateModel } from '../categories-store/categories.state';
import { SetCategoriesData } from '../categories-store/categories.actions';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  categoriesList: Category[] = [];

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API}/categories`);
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${API}/authors`);
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

  addOrEditVideo(authorVideoData: Author, authorID: number): Observable<Author> {
    return this.http.put<Author>(`${API}/authors/${authorID}`, authorVideoData);
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
              categories: this.addCategoryName(video.catIds),
              bestFormat: this.addBestFormat(video.formats),
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


  addBestFormat(formats: { [key: string]: formatObject }) {
    const allFormat = Object.values(formats)

    const sortedFormat = this.formatSorting(allFormat);

    const bestFormat = sortedFormat[sortedFormat.length - 1];

    return bestFormat.res
  }


  formatSorting(allFormat: formatObject[]) {
    // ASC sorting of movies format
    const n = allFormat.length;
    let swapped;

    const findResValue = (res: string) => {
      return Number(res.replace('p', ''))
    }

    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if (allFormat[i].size > allFormat[i + 1].size) {
          const temp = allFormat[i];
          allFormat[i] = allFormat[i + 1];
          allFormat[i + 1] = temp;
          swapped = true;
        }

        else if (allFormat[i].size === allFormat[i + 1].size) {

          //check res when size is equal
          if (findResValue(allFormat[i].res) > findResValue(allFormat[i + 1].res)) {
            const temp = allFormat[i];
            allFormat[i] = allFormat[i + 1];
            allFormat[i + 1] = temp;
            swapped = true;
          }
        }
      }
    } while (swapped);

    // ASC sorting
    return allFormat;
  }




}
