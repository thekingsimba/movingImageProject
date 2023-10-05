import { Component, OnInit } from '@angular/core';
import { ProcessedVideo } from '../../models/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'mi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos: ProcessedVideo[] = [];

  categoryList: any[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.setCategoryList();
    this.setVideoList();
  }

  setCategoryList() {
    this.dataService.getCategories().pipe().subscribe(
      (resp) => {
        console.log(resp)
      },
      (error) => {

      }
    )
  }

  setVideoList() {
    this.dataService.getVideos().subscribe()
  }

}
