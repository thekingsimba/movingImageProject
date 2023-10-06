import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Author, Category, Video } from 'src/app/models/interfaces';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'mi-add-edit-videos',
  templateUrl: './add-edit-videos.component.html',
  styleUrls: ['./add-edit-videos.component.css']
})
export class AddEditVideosComponent implements OnInit {

  videoName: string = "";
  authorList: Author[] = [];
  categoryList: Category[] = [];
  selectedAuthorId?: number;
  selectedCategoryId?: number;

  constructor(
    private dataService: DataService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setAuthorList();
    this.setCategoryList();
  }

  setAuthorList() {
    this.dataService.getAuthors().subscribe({
      next: result => {
        this.authorList = result;
      },
      error: error => {
        this.toast.error(" An error occurred while loading the Authors list, please try again")
        console.error(error);
      }
    })
  }

  setCategoryList() {
    this.dataService.getCategories().subscribe({
      next: result => {
        this.categoryList = result;
      },
      error: error => {
        this.toast.error(" An error occurred while loading the CategoryList list, please try again")
        console.error(error);
      }
    })
  }


  onSubmit(formData: NgForm): void {
    const videoFormData = formData.form.value;

    const authorConcerned = this.authorList.find(author => author.id === Number(videoFormData.videoAuthorId));

    if (authorConcerned) {
      const authorVideoList = authorConcerned.videos;

      const newVideo: Video = {
        id: this.getCurrentVideoId(authorVideoList),
        catIds: videoFormData.videoCategoryId,
        name: videoFormData.videoName,
        formats: {
          one: { res: "1080p", size: 1000 }
        },
        releaseDate: this.getReleaseDate()
      }

      authorConcerned?.videos.push(newVideo)

      //console.log(authorConcerned)

      //this.dataService.addNewVideo(authorConcerned).subscribe();
    }
  }


  buttonClicked(event?: MouseEvent) {
    this.router.navigate(['/home']);
  }

  getCurrentVideoId(authorVideoList: Video[]) {
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


}
