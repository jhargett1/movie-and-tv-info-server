# Movie and TV Show Information Server

This is a server that allows you to search for movie and TV show information. It integrates with the Utelly API and IMDb to provide details about movies and TV shows based on your search queries.

## Prerequisites

Before you can run this server, you'll need to have the following software installed on your system:

- [Node.js](https://nodejs.org/): JavaScript runtime for running the server.
- [npm](https://www.npmjs.com/): Node.js package manager, used for installing project dependencies.

## Installation

1. Clone this repository to your local machine:

```
git clone https://github.com/jhargett1/movie-and-tv-info-server.git
```


2. Navigate to the project directory:

```
cd movie-and-tv-info-server
```


3. Install project dependencies:

```
npm install
```

## Configuration

Before running the server, you need to set up your environment variables. Create a .env file in the root directory of the project and add your API key:

```
API_KEY=your_api_key_here

```

Replace `your_api_key_here` with your actual API key for the Utelly API.


## Starting the Server

Once you have installed the dependencies, you can start the server using the following command:

```
npm start
```


This will start the server, and it will be accessible at `http://localhost:3000` by default.

## Usage

1. Open a web browser and navigate to `http://localhost:3000`.

2. You will see a search bar where you can enter the title of a movie or TV show you want to search for.

3. Click the "Search" button, and the server will fetch information about the movie or TV show and display the results on the web page.

4. You can click on a result to view additional details, such as starring actors, IMDb rating, release date, and available locations.

## Stopping the Server

To stop the server, you can press `Ctrl + C` in the terminal where the server is running.

## License

This project is licensed under the MIT License.