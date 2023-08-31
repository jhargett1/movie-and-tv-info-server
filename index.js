// Import necessary modules and libraries
import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import imdbScraper from "easyimdbscraper";

// Load environment variables from .env file into process.env
dotenv.config();

// Access your environment variables like this
const apiKey = process.env.API_KEY;

// Create an Express application
const app = express();

// Define the port number for the server
const port = 3000;

// Function to fetch IMDb information by ID
const getImdbInfo = async (id) => {
  const info = await imdbScraper.getInfoByID(id);
  return info;
}

// Variable to track loading state
let loading = false;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Handle the root URL
app.get('/', async (req, res) => {
  // Reset the loading state and render the initial page
  loading = false;
  res.render('index', { results: null, searchTerm: '', error: null, loading: false });
});

// Handle POST requests for search
app.post('/search', async (req, res) => {
  // Extract the search term from the request
  const searchTerm = req.body.searchTerm;
  
  // Set loading state to true, indicating a search is in progress
  loading = true;

  try {
    // Send a request to the Utelly API to search for TV shows and movies
    const response = await axios.get('https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup', {
      params: {
        term: searchTerm
      },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
      }
    });

    // Extract results from the response
    const results = response.data.results;

    // Process each result
    for (let result of results) {
      // Extract IMDb ID from external IDs
      const imdbId = result.external_ids?.imdb?.id;
      
      if (imdbId) {
        // Fetch IMDb information for this result
        result.imdbInfo = await getImdbInfo(imdbId);

        // Extract and format various information from IMDb
        result.title = result.imdbInfo.title.replace(" - IMDb", "").replace(/&amp;/g, '&').replace(/&apos;/g, "'").replace(/&#x27;/g, "'");
        result.releaseDate = new Date(result.imdbInfo.releaseDate).toLocaleDateString();
        result.rating = result.imdbInfo.rating;
        result.poster = result.imdbInfo.poster;
        result.actors = result.imdbInfo.actors
          .map(a => a.name.replace(/&amp;/g, '&').replace(/&apos;/g, "'").replace(/&#x27;/g, "'"))
          .join(', ');
      }
    }

    // Reset the loading state and render the results
    loading = false;
    res.render('index', { results: results, searchTerm: searchTerm, error: null, loading: false });
  } catch (error) {
    // Handle errors, reset loading state, and render an error message
    loading = false;
    console.error(error);
    res.render('index', { results: null, searchTerm, error: 'An error occurred while fetching data.', loading: false });
  }
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
