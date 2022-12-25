import dbConnect from "utils/dbConnect";
import { fetcher } from "utils/api";

const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`

const getGenreMoviesUrl = (id, page) =>
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${id}&page=${page}&sort_by=popularity.desc&include_adult=false`

export default async function handler(req, res) {
    await dbConnect();

    const {method} = req;
    const {id, page} = req.query;

    switch (method) {
        case 'GET':
            if(id){
                try {
                    const results = await fetcher(getGenreMoviesUrl(id,page));

                    res.status(200).json(results);
                } catch (error) {
                    res.status(400).json({message: error.message});
                }
            }else{
                try {
                    const {genres} = await fetcher(genresUrl);
        
                    res.status(200).json(genres);
                } catch (error) {
                    res.status(400).json({message: error.message});
                }
            }
            break;
    
        default:
            res.status(404).json({message: `${method} method not supported on path /api/genres`});
            break;
    }
}