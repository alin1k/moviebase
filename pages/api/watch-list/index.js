import dbConnect from "utils/dbConnect";
import WatchList from "models/WatchList";

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;
    const { count } = req.query;

    switch (method) {
        case 'GET':
            try {
                let watchList = await WatchList.find({});

                if(count){
                    watchList = watchList.splice(0, count);
                }

                res.status(200).json(watchList);
            } catch (error) {
                res.status(400).json({message: error.message})
            }
            break;
    
        default:
            res.status(404).json({message : `${method} method not supported on path /api/watch-list`})
            break;
    }
}