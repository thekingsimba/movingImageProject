import { Component, OnDestroy, OnInit } from '@angular/core';
import { Author, DataFromDeleteSubject, ProcessedVideo } from '../../models/interfaces';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  videos: ProcessedVideo[] = [];
  deletedDataSubjectListener: DataFromDeleteSubject | null;
  dataSubscription: Subscription;

  constructor(
    private dataService: DataService,
    private toast: ToastrService
  ) {
    this.dataSubscription = this.dataService.detailsToDelete$.subscribe((newDataToDelete) => {
      // give details on the video deleted
      this.deletedDataSubjectListener = newDataToDelete;
      // Check if a new video is deleted and update list
      if (this.deletedDataSubjectListener?.newVideoDeleted) {
        this.updateListAfterDeleting()
      }

    });
  }

  ngOnInit(): void {
    this.setVideoList();
  }

  setVideoList() {
    this.dataService.getVideos().subscribe({
      next: result => {
        this.videos = result;
      },
      error: error => {
        this.toast.error(" An error occurred while loading the videos list, please try again")
        console.error(error);
      }
    })
  }

  updateListAfterDeleting() {
    this.videos = this.videos.filter(video => video.id != this.deletedDataSubjectListener?.videoId);
    this.dataService.updateModalDataToDelete(null);
  }



  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }


}
