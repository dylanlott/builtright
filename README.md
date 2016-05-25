# BUILTRIGHT
A build tracker for the auto enthusiast. 

### Commands and Development

[This](https://www.npmjs.com/package/generator-angm) is the yeoman generator the app is built off of. 
* `grunt dev` builds a development environment and watches for changes. Sometimes `watch` doesn't work so using a LiveReload plugin may be necessary. 
* `yo angm:angm-module` and then enter the name of the module you want to add. 

### Style guide 

#### Colors


### POST `/users` 

````
	{
	    "username":"lott.dylan@gmail.com", 
	    "password":"password"
	} 


### POST `/users/auth` 

````
{
    "username":"lott.dylan@gmail.com", 
    "password":"password"
}


### GET `/builds`

Returns all builds for the logged in user. 


### GET `/builds/:id` 
Returns details of one build with ID of `:id` 


### PUT `/builds/:id` 
Updates the build with ID of `:id` 


### POST `/builds/comment/:id` 

Adds a comment to the build. Takes an object with property "body". 

````
{
	"body":"comment body"
}
