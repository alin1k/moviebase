import History from "models/History";
import WatchList from "models/WatchList";
import { fetcher } from "utils/api";
import dbConnect from "utils/dbConnect";

const getMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`;

const discoverByGenresURL = (genres, page) =>
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&with_genres=${genres}&page=${page}`

const getGenresArray = (genresArray, genres, pointsVal) => {
    for(let genre of genres){
        const [genreExists] = genresArray.filter(val => val.id === genre.id);
        if(!genreExists){
            genresArray.push({...genre, points: pointsVal});
        }else{
            genresArray = genresArray.map(val=>{
                if(val.id == genre.id){
                    return {...val, points: genreExists.points + pointsVal};
                }else{
                    return {...val};
                }
            })
        }
    }
    genresArray = genresArray.sort((a, b) => (a.points < b.points) ? 1 : -1);

    return genresArray;
}

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const history = await History.find({});
                const watchList = await WatchList.find({});
                let genresArray = [];
                let genres = [];

                if(history.length && watchList.length){
                    for(let movie of history){
                        const {genres} = await fetcher(getMovieUrl(movie.id));
                        genresArray = await getGenresArray(genresArray, genres, 2);
                    };
    
                    for(let movie of watchList){
                        const {genres} = await fetcher(getMovieUrl(movie.id));
                        genresArray = await getGenresArray(genresArray, genres, 1);
                    };
                    genres = [genresArray[0].id, genresArray[1].id, genresArray[2].id].join(',');
                }else{
                    genres = [];
                }

                let {results: page1} = await fetcher(discoverByGenresURL(genres, 1));
                let {results: page2} = await fetcher(discoverByGenresURL(genres, 2));
                const results = [...page1, ...page2];
                
                let discover = [];

                for(let result of results){
                    const [watchedMovie] = await History.find({id: result.id});
                    
                    if(!watchedMovie){
                        console.log(result.original_title);
                        discover.push(result);
                    }
                }
    
                res.status(200).json(discover);
            } catch (error) {
                res.status(400).json({message: error.message});
            }
            break;
    
        default:
            res.status(404).json({message: `${method} method not supported on path /api/genres`});
            break;
    }
}