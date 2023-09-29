import { Component, OnInit} from '@angular/core';
import { AwsCatalogService } from './service/aws-catalog.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-aws-catalog',
  templateUrl: './aws-catalog.component.html'
  //styleUrls: ['./aws-catalog.component.css']
})
export class AwsCatalogComponent implements OnInit {
  allServicesFlag = true
  websiteServicesFlag = false
  singlePageAppFlag = false
  restfulApiFlag = false
  customServiceFlag = false

  onAllServicesClick(){
    this.allServicesFlag = true
  }

  onWebsiteAppClick(){
    this.allServicesFlag = false
    this.singlePageAppFlag = false
    this.restfulApiFlag = false
    this.customServiceFlag = false
    this.websiteServicesFlag = true
  }

  onSinglePageAppClick(){
    this.allServicesFlag = false
    this.restfulApiFlag = false
    this.customServiceFlag = false
    this.websiteServicesFlag = false
    this.singlePageAppFlag = true
  }

  onRestfulAPIClick(){
    this.allServicesFlag = false
    this.customServiceFlag = false
    this.websiteServicesFlag = false
    this.singlePageAppFlag = false
    this.restfulApiFlag = true
  }

  onCustomServicesClick(){
    this.allServicesFlag = false
    this.websiteServicesFlag = false
    this.singlePageAppFlag = false
    this.restfulApiFlag = false
    this.customServiceFlag = true
  }


  dynamicServiceCheck = false
  showCreateServiceButton = false
  staticServices: any[] = [
    //COMPUTE
    {
      name: 'EC2',
      category: 'Compute',
      routerLink: '/ec2',
      description: 'ec2',
      imageUrl: '/'
    },
    {
      name: 'Lambda',
      category: 'Compute',
      routerLink: '/lambda',
      description: 'lambda',
      imageUrl: '/'
    },
   
    //STORAGE
    {
      name: 'S3',
      category: 'Storage',
      routerLink: 's3',
      description: 's3',
      imageUrl: '/'
    },

    //DATABASE
    {
      name: 'RDS',
      category: 'Database',
      routerLink: '/rds',
      description: 'rds',
      imageUrl: '/'
    },
    {
      name: 'DynamoDB',
      category: 'Database',
      routerLink: '/dynamoDB',
      description: 'dynamoDB',
      imageUrl: '/'
    },

    //MESSAGING
    {
      name: 'SES',
      category: 'Messaging',
      routerLink: '/ses',
      description: 'ses',
      imageUrl: '/'
    },
    {
      name: 'SNS',
      category: 'Messaging',
      routerLink: '/sns',
      description: 'sns',
      imageUrl: '/'
    },
    {
      name: 'SQS',
      category: 'Messaging',
      routerLink: '/sqs',
      description: 'sqs',
      imageUrl: '/'
    },

    //MONITORING
    {
      name: 'CloudWatch',
      category: 'Monitoring',
      routerLink: '/cloudwatch',
      description: 'cloudwatch',
      imageUrl: '/'
    },

    //NETWORKING
    {
      name: 'VPC',
      category: 'Networking',
      routerLink: '/vpc',
      description: 'vpc',
      imageUrl: '/'
    },
    {
      category:'custom-service'
    }
  ];

  constructor(public awsCatalogService: AwsCatalogService, private loginService: LoginService) {}

   // Define an object to store the selected categories for filtering
  selectedCategories: { [key: string]: boolean } = {};
  categories: any;

  ngOnInit(): void {
    // Initialize selected categories based on the default use case
    this.filterServices('all-services');
    this.awsCatalogService.loadDynamicServices();
    this.showCreateServiceButton = this.loginService.isAdmin
  }
  
  
  // Function to filter services based on selected categories
  filterServices(useCase: string): void {
    console.log('Filtering test for ', useCase);

    // Clear the selected categories object
    this.selectedCategories = {};

    // Add the selected categories based on the use case
    switch (useCase) {
      case 'web-app':
        this.selectedCategories['Compute'] = true;
        this.selectedCategories['Storage'] = true;
        this.selectedCategories['Database'] = true;
        this.selectedCategories['Messaging'] = true;
        this.selectedCategories['Networking'] = true;
        break;
      case 'spa':
        this.selectedCategories['Storage'] = true;
        this.selectedCategories['Messaging'] = true;
        this.selectedCategories['Compute'] = true;
        break;
      case 'rest-api':
        this.selectedCategories['Compute'] = true;
        this.selectedCategories['Database'] = true;
        this.selectedCategories['Monitoring'] = true;
        this.selectedCategories['Networking'] = true;
        break;
      case 'custom-services':
        this.selectedCategories['custom-service'] = true;
        break;
      case 'all-services':
        this.selectedCategories['Compute'] = true;
        this.selectedCategories['Storage'] = true;
        this.selectedCategories['Database'] = true;
        this.selectedCategories['Messaging'] = true;
        this.selectedCategories['Monitoring'] = true;
        this.selectedCategories['Networking'] = true;
        this.selectedCategories['custom-service'] = true;
        break;
      case 'empty': //default page shown to user before selections are made
        break;
      default:
        break;
    }
  }


  // Function to check if a service should be displayed based on selected categories
 shouldDisplayService(service: any): boolean {
  console.log("shouldDisplayService: ", service)
  // If selectedCategories is empty (default state), don't display any services
  if (Object.keys(this.selectedCategories).length === 0) {
    return false;
  }


  if (Array.isArray(service.category)) {
    // If category is an array, use the some method
    return (
      Object.values(this.selectedCategories).every((value) => value === false) ||
      service.category.some((category: string) => this.selectedCategories[category])
    );
  } else {
    // If category is a string, directly check if it's in selectedCategories
    return (
      Object.values(this.selectedCategories).every((value) => value === false) ||
      this.selectedCategories[service.category]
    );
  }
}
}





