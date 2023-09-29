# Set up 
- Create and EC2 instance with a t2.medium and open ssh snd http/https permissions and use AMI2023
- ssh into the ec2 with remote connect in vs code and the pem file that was downloaded
- rum sudo yum update
- sudo yum install -y nodejs npm python3-pip nginx
- sudo systemctl enable nginx
- sudo systemctl start nginx
- sudo systemctl status nginx
- mkdir project
## Next edit the nginx conf file 
    - sudo vim /etc/nginx/nginx.conf
### Edit the server section with this information
    server {
        listen       80;
        listen       [::]:80;
        server_name  3.142.244.123; #<-----UPDATE WITH EC2 PUBLIC IPV4>
        root         /home/ec2-user/project/Frontend/cloud-angular-app/dist/cloud-angular-app;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        index index.html index.htm;

        location / {
        try_files $uri /index.html;

        }
## Download Code Zip file 
    - download the zip file from main on git 
    - extract it on your local computer 
    - remove in package-lock.json files or node modules 
    - copy all files in lpp-2023-capstone-project-main to the remote host in cs code
![Folder structure example](image.png)


## Run the following comands
- cd project/
- npm install
- cd Frontend
- npm install
- export FLASK_ENV="production"
- export NPM_ENV="production"
- cd ..; cd Backend/Python
- python -m venv .venv
- cd .venv
- source bin/activate
- cd ..
- pip install -r ec2-requirements.txt
- deactivate 
- cd ..; cd ..; cd Frontend/cloud-angular-app
- npm run build (server may crash so dont worry just reboot or (stop and restart but this will make you have a new IP))
- sudo systemctl restart nginx

you should be able to see the bewsite now on http://your.ip.goes.here.


## Start the Flask service Run
- sudo systemctl start app

To Restart Python Flask
- sudo systemctl daemon-reload

* If it is not already set up then you need to follow the instructions in this website:https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-gunicorn-and-nginx-on-ubuntu-22-04

### EC2 Commands
Start Python Flask
- sudo systemctl start app

To Restart Python Flask
- sudo systemctl daemon-reload

To start nginx 
- sudo systemctl start nginx

To restart nginx
-sudo systemctl restart nginx
### followed this page

# Too allow FLask to work
- Go to this in microsoft edge edge://flags/#block-insecure-private-network-requests
- disable 
Be sure to reenable when you are done