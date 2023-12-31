import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Author, Category, Video } from 'src/app/models/interfaces';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ADD_VIDEO, EDIT_VIDEO } from 'src/app/constants';

@Component({
  selector: 'mi-add-edit-videos',
  templateUrl: './add-edit-videos.component.html',
  styleUrls: ['./add-edit-videos.component.css']
})
export class AddEditVideosComponent implements OnInit, OnDestroy {

  videoName: string = "";

  authorList: Author[] = [];
  authorId!: number;
  currentAuthor?: Author;
  previewAuthor: Author;

  allCategoryList: Category[] = [];
  videoCategoryList: number[];

  videoId!: number | string;

  purpose: string = ADD_VIDEO;

  constructor(
    private dataService: DataService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.route.params.subscribe(({ purpose, authorId, videoId }) => {
      this.purpose = purpose;
      this.authorId = Number(authorId);
      this.videoId = Number(videoId);
    });

    this.dataService.updateAddNewButtonStatus(false);

  }

  ngOnInit(): void {
    this.setAuthorList();
    this.setCategoryList();
  }


  setAuthorList() {
    this.dataService.getAuthors().subscribe({
      next: result => {
        this.authorList = result;
        if (this.purpose === EDIT_VIDEO) {
          this.previewAuthor = this.authorList.find(author => author.id === Number(this.authorId))!;
          const videoConcerned = this.previewAuthor!.videos.find(video => video.id === this.videoId)!;
          this.videoName = videoConcerned.name;
          this.videoCategoryList = videoConcerned.catIds
        }
      },
      error: (error) => {
        this.toast.error(" An error occurred while loading the Authors list, please try again")
        console.error(error);
      }
    })
  }

  setCategoryList() {
    this.dataService.getCategories().subscribe({
      next: result => {
        this.allCategoryList = result;
      },
      error: error => {
        this.toast.error(" An error occurred while loading the CategoryList list, please try again")
        console.error(error);
      }
    })
  }


  onSubmit(formData: NgForm): void {
    const videoFormData = formData.form.value;

    this.currentAuthor = this.authorList.find(author => author.id === Number(videoFormData.authorId))!;

    const authorVideoList = this.currentAuthor.videos;

    if (this.currentAuthor) {

      //============= ADD VIDEO ============================
      if (this.purpose === ADD_VIDEO) {

        const newVideo: Video = {
          id: this.getNewVideoId(authorVideoList),
          catIds: videoFormData.videoCategoryList,
          name: videoFormData.videoName,
          formats: {
            one: { res: "1080p", size: 1000 }
          },
          releaseDate: this.getReleaseDate()
        }

        this.currentAuthor.videos.push(newVideo)

      }

      //============= EDIT VIDEO ============================
      else if (this.purpose === EDIT_VIDEO) {

        const videoConcerned = this.previewAuthor.videos.find(video => video.id === this.videoId)!;

        const editedVideo: Video = {
          id: videoConcerned.id, // video Id for the preview author
          catIds: videoFormData.videoCategoryList,
          name: videoFormData.videoName,
          formats: videoConcerned!.formats,
          releaseDate: videoConcerned!.releaseDate
        }

        /* NOTE: 
          We will assign the video to the right author
          if the edited video goes to another author then it become a new video for the new author (new id)
          in that case we have to delete the video from the preview author list 
        */

        //assign video to new author
        if (this.currentAuthor.id != this.previewAuthor.id) {

          // delete from preview author list
          this.deleteVideo(this.previewAuthor, videoConcerned.id, this.previewAuthor.id);
          // set new id
          editedVideo.id = this.getNewVideoId(authorVideoList);
          this.currentAuthor.videos.push(editedVideo);

        }
        //assign video to same author
        else if (this.currentAuthor.id === this.previewAuthor.id) {

          const videoConcernedIndex = this.currentAuthor.videos.indexOf(videoConcerned)
          this.currentAuthor.videos[videoConcernedIndex] = editedVideo

        }

      }

      this.addOrEditVideo(this.currentAuthor, this.currentAuthor.id)
    }
  }

  setNewVideo() {

  }

  addOrEditVideo(authorData: Author, authorID: number) {
    this.dataService.addOrEditVideo(authorData, authorID).subscribe({
      next: result => {
        if (this.purpose === ADD_VIDEO) {
          this.toast.success("Video successfully saved !");
        } else {
          this.toast.success("Video successfully edited !");
        }

        this.router.navigate(['/home']);
      },
      error: error => {
        this.toast.error(" An error occurred while saving the video, please try again")
        console.error(error);
      }
    });
  }

  deleteVideo(authorData: Author, videoId: number, authorID: number) {
    this.dataService.deleteVideo(authorData, videoId, authorID).subscribe({
      next: result => {
        this.toast.info("Video deleted from the preview Author list!");
      },
      error: error => {
        this.toast.error(" An error occurred while deleting the video from the preview Author list")
        console.error(error);
      }
    });

  }

  buttonClicked(event?: MouseEvent) {
    this.router.navigate(['/home']);
  }

  getNewVideoId(authorVideoList: Video[]) {
    const lastVideoId = authorVideoList[authorVideoList.length - 1].id
    return lastVideoId + 1;
  }

  getReleaseDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }


  isSet(value: any): boolean {
    if ((typeof value === 'string') && value.trim() === '') {
      return false;
    }
    return typeof value !== 'undefined' && value !== null && value;
  }


  ngOnDestroy() {
    this.dataService.updateAddNewButtonStatus(true);
  }


}
