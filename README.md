# WebScraper
Documentation interview project

Enhancing api functionality:
I would've liked to implement a functionality that translates the text from the
base language to another using the npm package google-translate.
The user would've chose which language he wants from a dropdown menu.
Explaining the API:
The modules:
Express: for creating the web server
Body-parser: for parsing data
Axios: for making requests from the external website
Fs: for reading/writing files
Path: for working with file and directory paths
Sentiment: for sentiment analysis of text
Cheerio: for parsing and manipulating HTML
I chose these packages for this project because I found them to be the most
optimal for the task, the only doubt at the beggining when I was researching
was “Should I use Cheerio or Puppeteer?” but in final, Cheerio won because I
found out that is faster since it doesn’t render websites and I could traverse the
DOM and manipulate elements with Cheerio. Another thing that convinced me
to use Cheerio is that I watched a video that said something like “is better to use
Cheerio is you have static websites like a blog site”.
Middleware
 I’ve got 2 middleware functions for parsing incoming JSON and HTTP request
and one for parsing URL encoded data in HTTP request.
Functions
In the application I have 2 functions for the tasks.
The main function that builds the page named ‘buildPage()’ is responsible for
constructing the html page using data provided in the 'body’ and ‘host’ where
we found the object containing ‘title, image, description, slug’ with the data and
the url which is a string inside ‘host’. The sentiments generated for the text were
made by creating a Sentiment object from the npm module and it’s beeing used
to analyze the sentiment of the description, where description is a property
extracted from the body object where we have text. After that, I call the
countWords() function to count the number of words given in description and
store it into wordCount variable. The part that contructs the html page is called
stringToHtml where I construct the page using template literals and display the
data(<h3>${title}</h3>, <p>${description}</p> etc.). The way I accessed the
img, firstly I went into the imge object and took the .src from there, gave the
img a width and height and alternatively if this doesn’t work, I’m displaying the
slug(for example: 'the-radiant-days-of-summer'). Finally, I use fs method to
write the html content of the stringToHtml to a file named index.html and if it
was an error I log the error, if it was a success, I log in the terminal that it was
written successfully.
The second function takes an input as a parameter, it splits the text into words
using whitespaces as the delimiter and it returns the count of words in the text.
Routes
The route for scraping ‘/scrape’
 In the application, I have a route for scraping, that is listening for http POST
requests at the path ‘/scrape’ and when a POST request is made, it expects a
JSON object in the request body with url property. There, in the try/catch block
I use axios to make an http GET request to the provided url(example:
/blog/the-joys-of-gardening) to fetch the html content of that page, then I load
with cheerio the html content and in the scrapedBody I target the body element
of the HTML page, retrieve all the child nodes and text within the body
(‘.contents()’ method) then convert all text and child nodes into a string
(‘.text()’ method) and the result in there is saved in a JSON format and parsed
into a js object. In the ‘const post’ I navigate through the structure of the
scraped JSON data which contains the relevant data from the task. After that, to
generate the HTML content of that page, I call the buildPage() function with
‘post’ where I have saved the data that I needed and a second parameter ‘host’
where I stored the link of the app(https://wsa-test.vercel.app/). If what is
above worked, it generates an “index.html” file using the buildPage function
with the scraped data and after generating the file, it sends the file as a response
to the client/browser and display the generated html page.
The default route ‘/’
When a GET request is made to the root url (https://wsa-test.vercel.app/) this
route is triggered and it servers the “index.html” file to the client in response to
the GET request, allowing to acces the generated html page.
Guide how to run the application
Take the code from the github repository: https://github.com/rlzv/WebScraper
and after unzip it, enter the terminal and install the modules using npm i. After
that, in the directory project use nodemon index.js in order to start the server
and navigate to http://localhost:3000/ on browser.
Open the Postman for example to make a post request in order to see the data.
After typing into the input the URL http://localhost:3000/scrape in order to
access the endpoint and in the body for example:
{
 "url": "https://wsa-test.vercel.app/blog/the-radiant-days-of-summer"
}
You could also change that value string inside url to test the other blog pages:
https://wsa-test.vercel.app/blog/the-joys-of-gardening
https://wsa-test.vercel.app/blog/the-challenges-of-urban-living
https://wsa-test.vercel.app/blog/the-radiant-days-of-summer
https://wsa-test.vercel.app/blog/neutral-observations-on-modern-art
https://wsa-test.vercel.app/blog/the-disappointing-reality-of-junk-food
After sending the POST request from Postman, on the localhost on browser you
will see the scraped data.
