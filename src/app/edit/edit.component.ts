import { Component, OnInit } from '@angular/core';
import { FilemanagerApiService } from '../filemanager-api.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: string;
  fileData: any;
  editForm: FormGroup;

  constructor(private apiService: FilemanagerApiService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
    })
    this.setFileData();

    this.editForm = this.formBuilder.group({
      id: [''],
      title: [''],
      description: [''],
      tags: ['']
    });
  }

  setFileData() {
    this.apiService.getFileDetails(this.id).subscribe(
      (data : any) => {
      this.fileData = data;
      this.editForm.get('id').setValue(this.fileData.id);
      this.editForm.get('title').setValue(this.fileData.title);
      this.editForm.get('description').setValue(this.fileData.description);
      this.editForm.get('tags').setValue(this.fileData.tags);
      console.log(this.fileData);
      },
      err => console.error(err)
    );
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('id', this.editForm.get('id').value);
    formData.append('title', this.editForm.get('title').value);
    formData.append('description', this.editForm.get('description').value);
    formData.append('tags', this.editForm.get('tags').value);
    console.log(this.editForm);
    this.apiService.editFile(formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )

    this.goBackToDetails();
  }

  goBackToDetails() {
    this.router.navigate(['/details/'+this.id]);
  }

}
