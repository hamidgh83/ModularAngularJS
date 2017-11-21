# ModularAngularJS

This project is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.


## Getting Started

To get you started you can simply clone the `ModularAngularJS` repository and install the dependencies.


### Prerequisites

In order to log in to the app you need to prepare a simple web API and setup configuration file which has been located at "/app/modules/config" folder.


### Run the Application

This application can be run at any web server environment, so you can simply copy the source into your web server root folder. 


## Directory Layout

```
app/                    --> all of the source files for the application
  assets                --> default application assets folder
  directives            --> all app directives
  lib/                  --> external libraries
    bower               --> bower components
  modules/              --> all app modules
    authentication      --> authentication module
    config              --> app config folder
    panel/              --> panel module
      controllers       --> controllers of panel module
      services          --> services of panel module
      views             --> views of panel module
      panelModule.js    --> initializing panel module
  services              --> all app services
  app.html              --> app layout file (the main html template file of the app)
  app.js                --> main application module
  home.html             --> home layout file
  main.js               --> requirejs config file
.bowercc                --> bower component path file
bower.json              --> bower component config file
index.html              --> main application layout


