import { Component, Input } from '@angular/core';
import { ProcessedVideo } from '../../models/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'mi-videos-table',
  templateUrl: './videos-table.component.html',
  styleUrls: ['./videos-table.component.css'],
})
export class VideosTableComponent {
  @Input() videos: ProcessedVideo[] = [];

  constructor(
    private router: Router
  ) { }

  navigateToEditVideo(authorId: number, videoId: number) {
    this.router.navigate([`/add-edit-videos/edit/${authorId}/${videoId}`]);

  }
}
