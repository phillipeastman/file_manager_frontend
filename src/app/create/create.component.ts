import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FilemanagerApiService } from '../filemanager-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  uploadForm: FormGroup;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private formBuilder: FormBuilder, private apiService: FilemanagerApiService, private router: Router) { }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type == 'image/jpeg' || file.type == 'video/mp4' || file.type == 'application/pdf') {
        this.uploadForm.get('file').setValue(file);
      } else {
        console.log('Wrong file type selected.');
        this.uploadForm.get('file').setValue(null);
        this.fileInput.nativeElement.value = '';
      }
      this.uploadForm.get('file').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.uploadForm.get('title').value);
    formData.append('description', this.uploadForm.get('description').value);
    formData.append('tags', this.uploadForm.get('tags').value);
    formData.append('file', this.uploadForm.get('file').value);
    console.log(this.uploadForm);
    this.apiService.uploadFile(formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )

    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      title: [''],
      description: [''],
      tags: [''],
      file: ['']
    });
  }

}
