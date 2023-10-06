import { Component, OnInit } from '@angular/core';
import { Author, ProcessedVideo } from '../../models/interfaces';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'mi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos: ProcessedVideo[] = [];

  constructor(
    private dataService: DataService,
    private toast: ToastrService
  ) { }

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




}
