import { Component, OnInit } from '@angular/core';
import * as yaml from 'js-yaml';
import { Router } from '@angular/router';
import { AwsCatalogService } from 'src/app/aws-catalog/service/aws-catalog.service';
import { LoginService } from '../login/login.service';
import { CloudformApiService } from './services/cloudform-api.service';
import { BehaviorSubject } from 'rxjs';
import { UniversalHeaderService } from 'src/universal-header/universal-header.service';

@Component({
  selector: 'app-cloudform-templates',
  templateUrl: 'cloudform-templates.component.html'
  //styleUrls: ['cloudform-templates.component.css']
})
export class CloudFormationTemplateComponent implements OnInit {

  content: string = " ";
  isJson: boolean = true;
  revisedContent: string = ""
  templateName: string = ""

  loggedIn: boolean = false;
  loginSubject$: BehaviorSubject<boolean>;

  // Data Inputs
  jsonData = {
    name: 'John Doe',
    age: 30,
    email: 'johndoe@example.com',
  };

  yamlData = {
    name: 'John Doe',
    age: 30,
    email: 'johndoe@example.com',
  };

  constructor(private router: Router,
              public CartService: AwsCatalogService,
              private loginService: LoginService,
              private cloudformApiService: CloudformApiService,
              private headerService: UniversalHeaderService) {
    this.loginSubject$ = this.headerService.getLoggedInStatus();

    this.loginSubject$.subscribe(value => {
      this.loggedIn = value
    })
  }

  // This needs to be refactored for switching between JSON/YAML
  ngOnInit() {
    const resources = this.CartService.getCart().reduce((acc, item) => {
      // Assuming item.cloudFormation is already a valid CloudFormation JSON string.
      const resource = JSON.parse(item.cloudFormation);
      return { ...acc, ...resource };
    }, {});
  
  
    const cloudFormationTemplate = {
      Resources: resources
    };
  
  
    this.content = JSON.stringify(cloudFormationTemplate, null, 2);
    this.displayJson();
    console.log(this.CartService);
    console.log(this.CartService.getServiceNames());
  }
  
  
  
  
  
  displayJson() {
    this.content = this.CartService.getCart().map(item => item.cloudFormation).join(',\n');
    this.content = "{\n\"Resources\": \n" + this.content + "\n\n}";
    this.isJson = true;
  }

  displayYaml() {
    this.content = yaml.dump(this.yamlData);
    this.isJson = false;
  }

  download() {
    if (this.isJson) {
      this.downloadJson()
    } else {
      this.downloadYaml();
    }
  }

  downloadJson() {
    const blob = new Blob([this.content], { type: 'application/json' });
    this.downloadFile(blob, 'data.json');
  }

  downloadYaml() {
    const blob = new Blob([this.content], { type: 'application/yaml' });
    this.downloadFile(blob, 'data.yaml');
  }

  // Helper function to handle the download logic
  private downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  goBack() {
    this.router.navigate(['finance-app'])
  }

  commit() {
    this.download()
    this.saveToDB()
  }

  saveToDB() {
    if (!this.loginService.IsLoggedIn) {
      console.log("user not logged in")
      console.log(this.loginService.CurrentUser);
      return
    }
    this.cloudformApiService.save(this.content, this.templateName)
    console.log("this is the logged in user:", this.loginService.CurrentUser);
  }
}
