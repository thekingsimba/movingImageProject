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
  private dataSubscription: Subscription;

  constructor(
    private dataService: DataService,
    private toast: ToastrService
  ) {
    this.dataSubscription = this.dataService.detailsToDelete$.subscribe((newDataToDelete) => {
      this.deletedDataSubjectListener = newDataToDelete;

      if (this.deletedDataSubjectListener?.newVideoDeleted) {
        console.log("called");
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
    console.log(this.videos);
    this.videos = this.videos.filter(video => video.id != this.deletedDataSubjectListener?.videoId);
    console.log(this.videos);
    this.dataService.updateModalDataToDelete(null);
  }



  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }


}
