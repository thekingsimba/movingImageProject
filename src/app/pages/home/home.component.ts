import { Component, OnInit } from '@angular/core';
import { ProcessedVideo } from '../interfaces';

@Component({
  selector: 'mi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos: ProcessedVideo[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
