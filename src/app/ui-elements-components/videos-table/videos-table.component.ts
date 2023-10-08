import { Component, Input } from '@angular/core';
import { Author, ProcessedVideo } from '../../models/interfaces';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { EDIT_VIDEO } from 'src/app/constants';

@Component({
  selector: 'mi-videos-table',
  templateUrl: './videos-table.component.html',
  styleUrls: ['./videos-table.component.css'],
})
export class VideosTableComponent {
  @Input() videos: ProcessedVideo[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private toast: ToastrService
  ) { }

  navigateToEditVideo(authorId: number, videoId: number) {
    this.router.navigate([`/add-edit-videos/${EDIT_VIDEO}/${authorId}/${videoId}`]);
  }


  deleteThisMovie(videoId: number, authorID: number) {

    const showModal = true;
    this.dataService.getOneAuthor(authorID).subscribe({
      next: result => {
        const authorData = result;
        this.dataService.updateModalDataToDelete({ showModal, authorData, videoId, authorID });
      },
      error: error => {
        this.toast.error("An error occurred while selecting the videos to deleting")
        console.error(error);
      }
    })
  }
}
