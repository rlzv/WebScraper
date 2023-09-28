const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const Sentiment = require("sentiment");

const cheerio = require("cheerio");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

function countWords(text) {
  const words = text.split(/\s+/); // split text into words using whitespace as the delimiter
  return words.length;
}

function buildPage(body, host) {
  const { title, image, description, slug } = body;

  const sentiment = new Sentiment();
  const sentimentResult = sentiment.analyze(description); // Analyze the sentiment of the description

  const wordCount = countWords(description);

  const stringToHtml = `
    <h3>${title}</h3>
    <p>${description}</p>
    <p>Word Count: ${wordCount}</p>
    <p>Sentiment Score: ${sentimentResult.score}</p>
    <img src="${host}${image.src}" height="500" width="600" alt="${slug}"/>
  `;

  fs.writeFile("index.html", stringToHtml, (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
    }
  });
}

const host = "https://wsa-test.vercel.app";
app.post("/scrape", async (req, res) => {
  const { url } = req.body;

  try {
    const htmlContent = await axios.get(url);
    const $ = cheerio.load(htmlContent.data);

    const scrapedBody = JSON.parse($("body").contents().text());
    const post = scrapedBody.props.pageProps.post;
    //console.log(post);

    buildPage(post, host);

    res.sendFile(path.join(__dirname, "/index.html"));
  } catch (error) {
    console.error("Error scraping and analyzing data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
