# Ajax and Callbacks

## Objectives
+ Explain what an API is and why it's used
+ Explain what Ajax is and why it's used
+ Make a `get` request using Ajax to append text to a page
+ Explain what a callback is and why Ajax runs asynchronously

## Intro

So far, when you've been using an API, you've been using a gem to access the API endpoints. Basically, you're relying on work someone else did to access clean data in the desired format.

Instead of relying on a gem or library to do the heavy lifting for us, we can use Ajax to do it ourselves, without having a page refresh. 


## API Basics

Underneath the hood of all those gems, a request as been made to the API (to a specific url) and then the app responds to that request with the data.

use postman chrome extension or app?? to make API request to demonstrate getting back JSON and manipulating it (screenshots) from the Github API

theoretical definition of API

## Ajax

describe what ajax is and what it's used for

ajax communicates with database without need for page refresh - helps with single page applications

use AJAX `get` method to retrieve some text from `index/sentence.html`  and display the text in index.html

use `python -m SimpleHTTPServer` to serve page to make request

 
## Callbacks

ajax follows an asynchronous pattern, the get and post requests executes the success code block only when it gets a response.

it knows it will take a while to GET the data, so while it's doing it, it will continue on with the rest of the code, and then execute the success block WHEN it's successful.

we tell it what to get, and then we tell it what to do once it's finished. 

like putting food in the microwave, you personally don't stand and wait until it's finished heating your food, you probably play on your phone, look at instagram, maybe watch some TV or do more work on learn. you go on and do other things until your food is heated, and then you remove it from the microwave and eat it (the success function)

if error - error callbacks

show more examples with code after - console.log


without passing it an argumnet- gets it automagically

## Resources