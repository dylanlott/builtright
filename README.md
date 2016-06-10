# BUILTRIGHT
A build tracker for the auto enthusiast. 

### Style guide 

#### Colors


### POST `/users` 

````
	{
	    "username":"lott.dylan@gmail.com", 
	    "password":"password"
	} 
````


### POST `/users/auth` 

````
{
    "username":"lott.dylan@gmail.com", 
    "password":"password"
}
````


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
````


### GET `/parts` 

Returns all parts for the current user. 

### POST `/parts` 

Creates a new Part

Takes an object of 

````
	{
		"name": part.name,
		"url": part.url,
		"price": part.price
	}
````
