# WebScraper
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
