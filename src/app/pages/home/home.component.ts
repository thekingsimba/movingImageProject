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

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }



}
