import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API } from '../constants';
import { Author, Category, ProcessedVideo, Video, formatObject } from '../models/interfaces';
import { Observable, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API}/categories`);
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${API}/authors`);
  }

  getVideos(): Observable<ProcessedVideo[]> {
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
    return [''];
  }

  addBestFormat(formats: { one: formatObject, two: formatObject, three: formatObject }) {
    return ''
  }
}
