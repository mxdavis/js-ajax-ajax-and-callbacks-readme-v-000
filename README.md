# jQuery Ajax and Callbacks

## Objectives

- Explain what an API is and why it's used
- Explain what Ajax is and why it's used
- Make a get request using Ajax to append text to a page
- Explain what a callback is and why Ajax runs asynchronously

## Introduction

In JavaScript, we can use `XMLHttpReqest` directly to access remote data, or web APIs, but it requires us to do a lot of lower-level wiring to get everything working. Now we're going to take a look at the Ajax capabilities of jQuery, which abstracts the XHR code into a nice, higher-level package.

## Postman and the GitHub API (done)

We interact with web APIs through a set of urls. Each url defines a resource that we request or take action on.

Rather than just talk about it, let's get our hands dirty and explore an API. To do this, we're going to use a tool called Postman. Postman is an easy to use Chrome extension that lets us make different web requests. It easily allows us to interact with web APIs. For our exercise, we are going to work with the GitHub API to retrieve information about the jQuery GitHub repository. To get started we need to setup Postman.

#### Postman Installation

1. Visit https://www.getpostman.com and install the Chrome extension.
2. Once you have it installed, open Postman from the Chrome Apps menu.
3. Skip the signup and go straight to the app.

Great!  Now you're all set up to make your own API requests. As you know, jQuery is a large open source project with many contributors. Those contributors make a hefty amount of commits. The GitHub API allows us to retrieve the list of commits made to the jQuery repository.

At this point Postman should be loaded and ready to go:

* Enter **https://api.github.com/repos/jquery/jquery/commits** in the URL textbox.
* Click the **Send** button.

Once the request finishes, Postman will display the results. Does this format look familiar?  If you said JSON (JavaScript Object Notation), then give yourself a pat on the back. What we're looking at is a JSON list of all the commits made to the jQuery repository. Each hash in the array has an author key. Do you recognize any of the committers?  If not, let's try to narrow the results returned from the GitHub API.

GitHub exposes a way for us to do this using HTML parameters. By changing the URL slightly to include the `author` parameter, we can ask the GitHub API to return only the commits made by John Resig (bonus points if you know who this is!).

Let's add `?author=jeresig` to the end of the url and see how the results change.

Go back to Postman and perform the following:

* Enter **https://api.github.com/repos/jquery/jquery/commits?author=jeresig**
* Click the **Send** button.

As you can see, getting data from an API is pretty easy. But we haven't really said what an API is.

## Defining APIs

For the purpose of this lesson, we are mostly concerned with web APIs. But the term API actually has a more broad meaning.

> In computer programming, an application programming interface (API) is a set of routines, protocols, and tools for building software and applications. - Wikipedia

In its simplest form, an API in relation to Object Oriented programming is a class and the list of methods we define for that class. When creating a class, we are defining a guidebook on how to interact with other parts of the code. We get to decide which methods and variables are public or private, essentially controlling how to interact with the class.

When we apply this concept to the web, we get web APIs like the GitHub API and Twitter API. From our Postman experiment, we saw how GitHub provides a way for us to interact with the data on their system. Just like how a class provides a set of public methods to interact with, web APIs provide us with urls.

The list of urls that GitHub provides on https://developer.github.com/v3 act as the public methods into their system. The developers that created the API control which resources they want to share and who has access to them. In the end it's all just the same data available from GitHub. The big difference is the GitHub API is just data and not the HTML/CSS/JavaScript which is the only thing our applications need.

## Ajax

Wouldn't it be nice if page refreshes didn't exist? What if we could do multiple things at once from a single web page? In a perfect world we could type into a search textbox and have searches being performed in the background as we type. That world is here and it's called Ajax! Asynchronous Javascript and XML (Ajax) is a technique that is used in web applications. It provides a way for content to be retrieved from a server and displayed without having to refresh the entire page.

Modern dynamic applications provide a better user experience by allowing users to manipulate data on the server and see the results without having to refresh the page. This is the power of Ajax in action. In the background, requests are made to a web API using JavaScript. As developers we can then choose to alter the displayed HTML based on the responses from the web API.

When you've used `XMLHttpRequest` directly to query an API like Github
and dynamically update your page, you've been doing Ajax. With jQuery,
we have a set of Ajax-related functions to make that even easier.

Let's try an example. You have an `index.html` file with a basic structure. Let's add a reference to jQuery so we can use it.

```html
<body>
  <p id="sentences">
    Loading our page...
  </p>
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <script src="script.js"></script>
</body>
```

There's also a `sentence.html` file. Let's add some data to it.

```html
<p>Ajax is a brand of cleaning products, introduced by Colgate-Palmolive in 1947 for a powdered household and industrial cleaner.</p>
<p>It was one of the company's first major brands.</p>
```

Now in our `script.js`, let's use the jQuery `get` function to make a
`GET` request to our `sentence.html` data.

**Note:** Remote data can come from anywhere, even your own server!
Remote just means it isn't directly included in the current page.

```js
// We should wait for the page to load before running our ajax request
$(document).ready(function(){
  // Now we start the Ajax GET request. The first parameter is the URL with the data.
  // The second parameter is a function that handles the response.
  $.get("sentence.html", function(response) {
    // Here we are getting the element on the page with the id of sentences and
    // insert the response
    $("#sentences").html(response);
  });
});
```

Let's load up `index.html` and see what happens!

Okay. Not a whole lot.

We actually need to serve this page from an HTTP server rather than load
it directly in our browser. At the console, run the following command:

```bash
$ python -m SimpleHTTPServer
```

This starts a simple server that will serve our files over HTTP. You need to start a server instead of just opening up `index.html` in the browser because of the browser enforced same-origin policy. To prevent security risks, the browser enforces a same origin policy. A different origin can be interpreted as a different domain, different protocol, and a different port.

When you open up  `index.html` by right clicking on the file, the site opens with `file://`. Same-origin policy only allows http, data, chrome, chrome-extension, https, chrome-extension-resource protocols. Ajax uses http requests, and thus must interact with http protocol in the browser.

Browse to [http://localhost:8000](http://localhost:8000/) and watch as the Ajax request is made and the new data is added to our web page. Pretty cool! This might all happen too quick to really notice anything so you may want to have your terminal window side by side with the browser window. This way you can see the request hit our server.

We used the power of Ajax to load data from the `sentence.html`. This same idea can be applied to calling the GitHub API or another remote resource.

## Callbacks

If we look at our last example, the Ajax request completed very quick but this won't always be the case. If we request data from a slow server over a slow internet connection, it might take multiple seconds to get a response. Using a callback allows our code to make our request and continue doing other things until the request completes.

Ajax follows an asynchronous pattern, which makes Ajax requests *non-blocking*. This means we don't sit around and wait for the request to finish before running the rest of our code. We set callbacks and then fire and forget. When the request is complete, the callbacks are responsible for deciding what to do with the returned data.

To make this concept stick, let's look at a real world example. When you put food into a microwave, you don't stand there and wait for the food to finish cooking. Okay, well, I do. Just in case.

![microwave](http://i.giphy.com/xLIwD85C0z9D2.gif)

But even if you stand there, you can do other things. You probably pick up your phone, look at Instagram, read some text messages and of course, work on [Learn](https://learn.co). Basically, you are doing other things while the microwave takes care of cooking your food.

When the food is cooked, the microwave beeps and you remove the food and eat it. This final step of removing the food and eating it is exactly how our callbacks work. One thing to note, as we wait for our food, we don't check if its done every 5 seconds (again, I do, because I'm very hungry, but I don't *have* to), we wait until the beep tells us it's done. Checking every 5 seconds is called *polling*, and it's a lot less efficient than waiting for the beep, which is our *callback*.

## Handling Problems

So far, we have been dealing with successful API requests. But things don't always go according to plan. What happens if the API we are using doesn't respond? Or if we attempt to retrieve a resource that doesn't exist?

This can happen when API requests are based on user input. Let's go back to the GitHub API where we are retrieving commits. Imagine we want to retrieve a specific commit using a SHA.

Postman:
https://api.github.com/repos/jquery/jquery/commits?sha=8f447576c918e3004ea479c278c11677920dc41a
Returns success

Postman error:
https://api.github.com/repos/jquery/jquery/commits?sha=fake-SHA
Returns a 404 not found

A good developer will make sure to handle these unexpected events gracefully when using Ajax. We can provide multiple callbacks when using jQuery: one to handle a successful response and one to handle when an error occurs.

Let's add this inside our document ready function, then open your
inspector and reload your page.

```javascript
$.get("this_doesnt_exist.html", function(data) {
  // This will not be called because the .html file request doesn't exist
  doSomethingGood();
}).fail(function(error) {
  // This is called when an error occurs
  console.log('Something went wrong: ' + error);
});
```

We chained an additional call to `fail` on the end of our request. We passed a callback function to the method which will run only if an error occurs. In our example we logged the error to the console, but in real world situation you might want to try to fix the issue or inform the user.

Note that it doesn't matter what you call `data` and `error` in the above examples — the only thing that matters is the order of the arguments. In the callback to `get()`, the first argument is going to be the data that the server sent back, so it makes sense to call it `data` — but we could just as well call it `response`. Similarly, the first argument to `fail()`'s callback is an error object, so we should probably give it a descriptive name like `error` (but we don't have to!).

This is another example of how we could use jQuery to perform an Ajax request.

```js
var url = "https://api.github.com/repos/rails/rails/commits?sha=82885325e04d78fb7ec608a4670164d842d23078";

$.get(url)
  .done(function(data) {
    console.log("Done");
    console.log(data);
  });
```

Note: The callback that gets passed into `.done`  gets `data` as an argument. `data` represents the response returned from the API. jQuery handles passing in that `data` object to the callbacks. This is essential to our fire and forget technique. We don't have to sit around and wait for the API to give us a response. Instead, we tell jQuery that when it receives a response to please pass it along to our callbacks so they can handle it accordingly.

## Resources

* [Application programming interface](http://en.wikipedia.org/wiki/Application_programming_interface)
* [Jquery.Get](http://api.jquery.com/jquery.get/)


<p data-visibility='hidden'>View <a href='https://learn.co/lessons/js-ajax-callbacks-readme'>AJAX and Callbacks</a> on Learn.co and start learning to code for free.</p>

<p class='util--hide'>View <a href='https://learn.co/lessons/js-ajax-callbacks-readme'>AJAX and Callbacks</a> on Learn.co and start learning to code for free.</p>
