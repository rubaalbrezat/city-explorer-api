const axios = require('axios');

//====================================================( FUNCTIONS )=============================================================

async function handleMovie(request, response) {

    const moviesCache = {};
    let cityName = request.query.searchQuery;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;
    
    if (moviesCache[cityName] !== undefined) {
        response.status(200).send(moviesCache[cityName]);
    } else {
            const moviesData = await axios.get(url);
            const arrayOfMoviesData = moviesData.data.results.map(item => {
                return new MovieApi(item);
            });
            moviesCache[cityName] = arrayOfMoviesData;
            response.status(200).send(arrayOfMoviesData);
    };
    
}

//=====================================================( CLASSES )=============================================================

class MovieApi {
    constructor(movie) {
        this.title = movie.title;
        this.overview = movie.overview;
        this.average_votes = movie.vote_average;
        this.total_votes = movie.vote_count;
        this.image_url = movie.poster_path;
        this.popularity = movie.popularity;
        this.released_on = movie.release_date;
    }
}

//=====================================================( EXPORTS )=============================================================

module.exports = {handleMovie};