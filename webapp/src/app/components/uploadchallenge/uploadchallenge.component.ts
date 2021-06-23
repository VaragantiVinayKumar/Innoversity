import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Challenge } from 'src/app/models/Challenge';
import { UploadchallengeService } from 'src/app/services/uploadchallenge.service';

@Component({
  selector: 'app-uploadchallenge',
  templateUrl: './uploadchallenge.component.html',
  styleUrls: ['./uploadchallenge.component.css'],
})
export class UploadchallengeComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: File;
  dropdownList = [];
  selectedFile: File;
  selectedItems = [];
  dropdownSettings = {};
  uploadChallenge: FormGroup;
  public challenge = new Challenge();
  uploadSuccess= false;
  uploadFailed= false;
  successMessage = 'Challenge uploaded successfully';
  handler: any = null;
  public isSelected: boolean;
  htmlMode = false;
  paymentSuccessful = false;
  paidChallenge = false;
  submitButtonName= "Upload Challenge";
  constructor(
    private fb: FormBuilder,
    private service: UploadchallengeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStripe();
    this.initForm();
    this.dropdownList = [
      'Health',
      'Science',
      'Engineering',
      'Aerospace',
      'Habitat',
      'Electricity',
      'Environment',
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };
  }
  initForm() {
    this.uploadChallenge = this.fb.group({
     challengerName: [''],
     challengeTitle: ['',[Validators.required]],
     challengeDomain: ['',[Validators.required]],
     challengeAbstract: ['',[Validators.required]],
     description: ['',[Validators.required]],
     rules: ['',[Validators.required]],
     rewardPrize: ['0'],
     expiryDate: ['',[Validators.required]],
     views:['0'],
     attempt:['0'],
     hired:['0'],
    //  attachments:['',[Validators.required]],
    //  challengeArtifacts:['',[Validators.required]],
     file: new FormControl('', [Validators.required])
   });
  }

  public onFileChanged(event) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  onItemChange(value) {
    this.isSelected = value ? true : false;
    if(value) {
      this.submitButtonName = "Pay and Upload Challenge";
    } else {
      this.submitButtonName = "Upload Challenge";
    }
  }

  pay(submitForm: FormGroup) {
    console.log('clicked pay');
    const amount = submitForm.get('rewardPrize').value;

    if (this.uploadChallenge.valid) {
      if (amount > 0) {
        var handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51Itz8xSEYEK3dxaT6Wxv2YqSd5P57ZM40EWFx2j9uUIes3FqIzrw6j3ihg1iMozBLQv4isCoCw8wx4750he7t65D00h7ccJVas',
          locale: 'auto',
          token: function (token: any) {
            console.log('token generated:', token.id);
            this.justCall();
          },
        });
        handler.open({
          name: 'Innoversity',
          description: '2 widgets',
          amount: amount * 100,
        });
      } else {
        this.justCall();
      }
    } else {
      // alert("form is invalid");
      console.log('form is invalid');
      this.uploadFailed = true;
    }
  }

  justCall() {
    console.log("upload called");
  }
  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51Itz8xSEYEK3dxaT6Wxv2YqSd5P57ZM40EWFx2j9uUIes3FqIzrw6j3ihg1iMozBLQv4isCoCw8wx4750he7t65D00h7ccJVas',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);
            alert('Payment Success!!');
          },
        });
      };
      window.document.body.appendChild(s);
    }
  }
  showbar:boolean;
  onSubmit(submitForm: FormGroup) {
    this.showbar=true;
    console.log('uploading a challenge');
    const loggedInUser = localStorage.getItem('userName');
    this.uploadChallenge.value.challengerName = loggedInUser;
    const item = submitForm.value;
    const uploadFileData = new FormData();
    console.log('file:', this.selectedFile);
    uploadFileData.append('item', JSON.stringify(item));
    uploadFileData.append('file', this.selectedFile);
    this.service.addChallenge(uploadFileData).subscribe((data) => {
      console.log(this.uploadChallenge.value);
      this.uploadSuccess = true;
      this.router.navigateByUrl('/dashboard');
    });
  }
  onItemSelect($event) {}
  get challengeName() {
    return this.uploadChallenge.get('challengeName');
  }
  get challengeTitle() {
    return this.uploadChallenge.get('challengeTitle');
  }
  get challengeDomain() {
    return this.uploadChallenge.get('challengeDomain');
  }
  get challengeAbstract() {
    return this.uploadChallenge.get('challengeAbstract');
  }
  get description() {
    return this.uploadChallenge.get('description');
  }
  get rules() {
    return this.uploadChallenge.get('rules');
  }
  get attachments() {
    return this.uploadChallenge.get('attachments');
  }
  get rewardPrize() {
    return this.uploadChallenge.get('rewardPrize');
  }
  get challengeArtifacts() {
    return this.uploadChallenge.get('challengeArtifacts');
  }
  get expiryDate() {
    return this.uploadChallenge.get('expiryDate');
  }
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    // minHeight: '4rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    enableToolbar: true,
    showToolbar: false,
    // placeholder: 'Enter  Challenge description here...',
    defaultParagraphSeparator: '',
    // defaultFontName: 'Times New Roman',
    // defaultFontSize: '4',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],

    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

  // onSelectFile(event) {
  //   const file = event.target.files[0];
  //     this.selectedFile = file;
  //   // if (e.target.files) {
  //   //   var reader = new FileReader();
  //   //   reader.readAsDataURL(e.target.files[0]);
  //   //   reader.onload = (event: any) => {
  //   //     this.selectedFiles = event.target.files;
  //   //   }
  //   // }
  // }
  // upload() {
  //   this.currentFileUpload = this.selectedFiles.item(0);
  //   this.service.pushFileToStorage(this.currentFileUpload).subscribe(event => {
  //     if (event.type === HttpEventType.UploadProgress) {
  //       // this.progress.percentage = Math.round(100 * event.loaded / event.total);
  //     } else if (event instanceof HttpResponse) {
  //       console.log('File is completely uploaded!');
  //     }
  //   });

  //   this.selectedFiles = undefined;
  // }

  get f() {
    return this.uploadChallenge.controls;
  }

  uploadMethod(submitForm: FormGroup) {
    console.log("calling payment");
    if (this.uploadChallenge.valid) {
      const amount = submitForm.get('rewardPrize').value;
      if (amount > 0) {
        this.doAsyncTask(amount).then(
          () => this.onSubmit(submitForm)
        );
      } else {
        this.onSubmit(submitForm);
      }
    } else {
      // alert("form is invalid");
      console.log('form is invalid');
      this.uploadFailed = true;
    }
  }

  justCall1() {
    console.log("payed now upload");
  }

  doAsyncTask(amount) {
    const error = false;
    return new Promise((resolve, reject) => {
      if (amount > 0) {
        var handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51Itz8xSEYEK3dxaT6Wxv2YqSd5P57ZM40EWFx2j9uUIes3FqIzrw6j3ihg1iMozBLQv4isCoCw8wx4750he7t65D00h7ccJVas',
          locale: 'auto',
          token: function (token: any) {
            console.log('token generated:', token.id);
            resolve('done')
          },
        });
        handler.open({
          name: 'Innoversity',
          description: '2 widgets',
          amount: amount * 100,
        });
      }
    });
  }

}
