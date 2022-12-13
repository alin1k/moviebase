import dbConnect from 'utils/dbConnect';
import History from 'models/History';

export default async function handler(req, res){
    await dbConnect();

    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const history = await History.find({});
                res.status(200).json(history);
            } catch (error) {
                res.status(400).json(error.message);
            }
            break;
    
        default:
            res.status(404).json({message: `${method} method not supported on /api/history`})
            break;
    }
}