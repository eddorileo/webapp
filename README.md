# Infringement.Report App

This repo hosts the codebase for app.infringement.report and serves as the frontend of the infringement.report API. 
We wanted to release the source code of our app to allow users to host their own custom version of infringement.report, or take components for use in their own systems.

Because we designed the codebase to be copied and modified, each 'screen' or module is designed to run independently of the existence other modules. 
For instance the "Query" interface contains almost all code required to build that interface, and only a handful of other files are required to load the page. 

# Using individual modules
If you would like to only use an individual module of infringement.report, you can find each screen as a separate folder inside the 'app' directory. 
Broadly, the module folders can be used as standalone, however you must make sure that the following files/functions are also included:
* The relevant template functions (found in templates/infringementreport/app)
* Both app/api.functions.js and app/account.functions.js should be included on each page

## API key
By default, the api call function will attempt to pull the user's api key from their local storage. 
If you do not want users to need to login, you can set an API key in *window.infringementreport_custom_apikey*

# Creating an Infringement.Report clone

If you'd like to create an infringement.report clone, you can do so by forking this repo and making a copy of the "templates/infringementreport" directory. 
Maintaining the default template files and function names will later allow you to merge in updates to the core app code without worrying about breaking custom functionality.

## Environment variables
Infringement.Report uses PHP to include template files, and environment variables are used to store the location of these template files. 
This helps us to maintain multiple versions of the app with the same codebase by modifying the template path.

The environment variables that must be set are:
* **template**: the directory name of the template folder you're using. We use "infringementreport"
* **registration_secret_key**: Partners will receive a key to allow users to signup to join their user group 

## Allowing your users to log in and sign up
If you intend to allow your users to sign up on your own version of the app, please [contact us](https://infringement.report/contact) first: 
users who sign up using the default 'registration_secret_key' are normal users of Infringement.Report and will receive emails containing our brand 
and links to the main infringement.report app. 

However, for partners we give an individual registration key, which entitles you to white labelled emails, 
custom packages and commission on sales, additional functionality, and a partner dashboard.

## Procfile and Heroku
The Infringement.Report app is hosted on Heroku, so this repo includes a Heroku Procfile. If you want to quickly spin up an infringement.report clone, you only need to set this repo as a deployment source

# Infringement.Report API Docs
If you'd like to know more about how to interface with the Infringement.Report API, please visit https://infringementreport.api-docs.io
