import { Component, OnInit } from '@angular/core';
import { FilemanagerApiService } from '../filemanager-api.service';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: string;
  fileData: any;

  constructor(private apiService: FilemanagerApiService, private route: ActivatedRoute, private srurl: DomSanitizer) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
    })

    this.apiService.getFileDetails(this.id).subscribe((data : any)  => {
      this.fileData = data
      // console.log(this.fileData);
    });
  }

  fileURL() {
    return this.srurl.bypassSecurityTrustResourceUrl(this.fileData.path);
  }

}
