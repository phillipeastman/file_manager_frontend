import { Component, OnInit } from '@angular/core';
import { FilemanagerApiService } from '../filemanager-api.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  files: Object;

  constructor(private apiService: FilemanagerApiService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit() {
    this.apiService.getFiles().subscribe(data => {
      this.files = data
      console.log(this.files);
    });
  }

}
