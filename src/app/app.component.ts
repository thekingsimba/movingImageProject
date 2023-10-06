import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './services/data.service';
import { Author, DataFromDeleteSubject } from './models/interfaces';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'mi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  pagePurpose: string;
  videoData: DataFromDeleteSubject | null;
  private dataSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private toast: ToastrService
  ) {
  }

  ngOnInit() {
    this.dataSubscription = this.dataService.detailsToDelete$.subscribe((newDataToDelete) => {
      this.videoData = newDataToDelete;
    });
  }

  showAddButton() {
    return this.pagePurpose != "edit"
  }

  buttonClicked(event?: MouseEvent) {
    this.router.navigate(['/add-edit-videos/add/new/video']);
  }

  onConfirm(event?: MouseEvent) {
    this.deleteVideo(this.videoData!.authorData, this.videoData!.videoId, this.videoData!.authorID)
  }

  onCancel(event?: MouseEvent) {
    this.router.navigate(['/home']);
  }

  onClose(event?: MouseEvent) {
    this.dataService.updateModalDataToDelete(null);
    this.router.navigate(['/home']);
  }

  deleteVideo(authorData: Author, videoId: number, authorID: number) {
    this.dataService.deleteVideo(authorData, videoId, authorID).subscribe({
      next: result => {
        this.toast.success("Video deleted from the list!");
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
    this.dataSubscription.unsubscribe();
  }

}