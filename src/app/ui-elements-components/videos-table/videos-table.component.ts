import { Component, Input } from '@angular/core';
import { Author, ProcessedVideo } from '../../models/interfaces';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'mi-videos-table',
  templateUrl: './videos-table.component.html',
  styleUrls: ['./videos-table.component.css'],
})
export class VideosTableComponent {
  @Input() videos: ProcessedVideo[] = [];

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  navigateToEditVideo(authorId: number, videoId: number) {
    this.router.navigate([`/add-edit-videos/edit/${authorId}/${videoId}`]);
  }


  deleteThisMovie(showModal: boolean, authorData: Author, videoId: number, authorID: number) {
    this.dataService.updateModalDataToDelete({ showModal, authorData, videoId, authorID })
  }
}
