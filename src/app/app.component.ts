import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './services/data.service';
import { Author, DataFromDeleteSubject } from './models/interfaces';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ADD_VIDEO } from './constants';

@Component({
  selector: 'mi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  pagePurpose: string;
  videoData: DataFromDeleteSubject | null;
  showAddNewButton: boolean;
  private videoDataSubscription: Subscription;
  private addNewBtnDataSubscription: Subscription;

  constructor(
    private router: Router,
    private dataService: DataService,
    private toast: ToastrService
  ) {
  }

  ngOnInit() {
    this.videoDataSubscription = this.dataService.detailsToDelete$.subscribe((newDataToDelete) => {
      this.videoData = newDataToDelete;
    });


    this.addNewBtnDataSubscription = this.dataService.addNewButtonStatus$.subscribe((newDataToDelete) => {
      this.showAddNewButton = newDataToDelete;
    });
  }

  buttonClicked(event?: MouseEvent) {
    const url = `/add-edit-videos/${ADD_VIDEO}/new/video`;
    this.router.navigate([url]);
  }

  onConfirm(event?: MouseEvent) {
    this.deleteVideo(this.videoData!.authorData, this.videoData!.videoId, this.videoData!.authorID)
  }

  onCancel(event?: MouseEvent) {
    this.dataService.updateModalDataToDelete(null);
    this.router.navigate(['/home']);
  }

  onClose(event?: MouseEvent) {
    this.dataService.updateModalDataToDelete(null);
    this.router.navigate(['/home']);
  }

  deleteVideo(authorData: Author, videoId: number, authorID: number) {
    this.dataService.deleteVideo(authorData, videoId, authorID).subscribe({
      next: result => {
        this.toast.info("Video deleted from the list!");
        const showModal = false;
        const newVideoDeleted = true;
        this.dataService.updateModalDataToDelete({ showModal, authorData, videoId, authorID, newVideoDeleted });
      },
      error: error => {
        this.toast.error(" An error occurred while deleting the video from the preview Author list")
        console.error(error);
      }
    });
  }

  ngOnDestroy() {
    this.videoDataSubscription.unsubscribe();
    this.addNewBtnDataSubscription.unsubscribe();
  }

}