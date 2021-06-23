import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RegistrationService } from 'src/app/services/registration.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  registerForm: FormGroup;
  showPassword: boolean = false;
  public selectedFile;
  imgURL: any = "./assets/images/profile.svg";


  constructor(private fb: FormBuilder,private service : RegistrationService,
              private router: Router) { }
   initForm() {
   this.registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
    email: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required]],
    city: ['', [Validators.required]],
    domain: ['', [Validators.required]],
    picture: [''],
    gender: ['',[Validators.required]]
  });
  // this.registerForm.get('city').setValue('Bangalore');
}


  ngOnInit(): void {
    this.initForm();
    this.dropdownList = ["Health","Science","Engineering", "Aerospace","Habitat","Electricity","Power Sources","Environment"];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',

    };
  }

  onItemSelect($event) {

  }

 

  msg:any;
  showbar:boolean;
  onSubmit() {
    if (this.registerForm.valid) {
      this.showbar=true;
      const uploadData = new FormData();
      const item = this.registerForm.value;
      uploadData.append('item', JSON.stringify(item));
      uploadData.append('myfile', this.selectedFile);
      this.service.registerUser(uploadData).subscribe(data => {
        this.msg="You are registered !";
        this.router.navigateByUrl("/login");
        }

      )
    } else {
      console.log("form is invalid");
      this.msg="Registeration unsuccessful !";
    }
  }


  get username() { return this.registerForm.get('username') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
  get domain() { return this.registerForm.get('domain') }
  get city() { return this.registerForm.get('city') }
  get picture() { return this.registerForm.get('picture') }
  get gender() { return this.registerForm.get('gender') }




  
  public mystyle = {
    fontSize:"20px",
    fontStyle:"italic"
  }


  url = "./assets/images/profile.svg";
  onSelectFile(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  public onFileChanged(event) {
    console.log(event);

    const file = event.target.files[0]; //takes only one file
    this.selectedFile = file;
    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read the binary data and encode it as base64 data url
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }
}
