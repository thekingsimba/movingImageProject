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

  navigateToEditVideo(videoId: number) {
    console.log('click')
    this.router.navigate(['/add-edit-videos/' + videoId]);

  }
}
