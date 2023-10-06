import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pagePurpose: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.pagePurpose = params['purpose'];
      console.log(params['purpose'])
    });
  }

  showAddButton() {
    return this.pagePurpose != "edit"
  }

  buttonClicked(event?: MouseEvent) {
    this.router.navigate(['/add-edit-videos/add/new/video']);
  }

}