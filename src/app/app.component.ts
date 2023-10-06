import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private router: Router
  ) { }


  buttonClicked(event?: MouseEvent) {
    console.log("click");
    this.router.navigate(['/add-edit-videos/new']);
  }

}