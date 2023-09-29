# Cloud Assistant #
## Synopsis ##
Build an application that can assist the product owners with their attempt to migrate on-premise applications to AWS Cloud.
The Cloud Assistant should have:
- UI screens using which the user can submit information about the existing application. For example:
- Type of application (Web Application, REST API, Single Page Applications, Batch Jobs etc)
- Tech stack (Java, Python, Angular, React, Databases etc)
Other infrastructure dependencies (CDN, Message Queue, Cache, Identity Management etc)
- Based on the information furnished (as above), the Cloud Assistant should outline the AWS services that are needed to migrate the on-premise application.
- The Cloud Assistant should also offer insights on the approximate cost overhead (one-time and periodical) should the application is considered for migration to AWS

## Features ##
The Cloud Assistant should have the following Modules
- Admin Module with the following functionalities
    - User Management
        - Add / Remove / Update AWS services information
        - Screens for capturing all the required information data needed to map the infrastructure requirements between on-premise applications and cloud applications
- User Module with the following functionalities
    - Screens using which the user can furnish details about the application that is under consideration for migration to cloud
    - Screens to list the required AWS services need to migrate the on-premise application
    - Screens for displaying the overall cost overhead
    - The user should also be able to customize the AWS infrastructural requirements (adding / removing / updating ) the services suggested to analyze the cost impact.
- The application should also generate the CloudFormation template that can be used for the on-premise application migration
