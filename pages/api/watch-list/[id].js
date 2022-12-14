import { fetcher } from 'utils/api';
import WatchList from 'models/WatchList';
import dbConnect from 'utils/dbConnect';

const getMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`;

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
        try {
            const watchList = await WatchList.findOne({id});

            if(watchList){
                res.status(200).json({found: true, watchList: watchList});
            }else{
                throw {message: "item not found in watch list"};
            }
        } catch (error) {
            res.status(400).json({found: false, message: error.message})
        }
        break;
  
    case 'POST':
        try {
            const {title, poster_path} = await fetcher(getMovieUrl(id));

            const watchList = new WatchList({id, title, poster: poster_path});
            console.log(watchList);
            await watchList.save();

            res.status(200).json(watchList);

        } catch (error) {
            res.status(400).json({message: error.message});
        }
        break;

    case 'DELETE':
        try {
            await WatchList.deleteOne({id});
            res.status(200).json({message: 'succesfully deleted'})
        } catch (error) {
            res.status(400).json({message: error.message});
        }
        break;

    default:
        res.status(404).json({message: `${method} method not supported on path /api/watch-list`})
        break;
  }
}
