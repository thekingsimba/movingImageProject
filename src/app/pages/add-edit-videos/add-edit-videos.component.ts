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
  selectedAuthor!: Author;
  selectedCategory!: Category;

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
    console.log(formData);
    // const videoFormData = formData.form.value;

    // const videoData: Video = {
    //   catIds: videoFormData.fullname,//number[]
    //   name: videoFormData.phonenumber,
    //   formats: videoFormData.email,
    // };

    // this.dataService.addNewVideo(videoData).subscribe(
    //   (resp) => {     });

  }


  buttonClicked(event?: MouseEvent) {
    this.router.navigate(['/home']);
  }

  //validation method
  isSet(value: any): boolean {
    if ((typeof value === 'string') && value.trim() === '') {
      return false;
    }
    return typeof value !== 'undefined' && value !== null && value;
  }


}
