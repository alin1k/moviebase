import mongoose from 'mongoose';

global.models = global.models || {};

global.models.WatchList =
  global.models.WatchList ||
  mongoose.model('WatchList', {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    poster: {type: String, required: true},
    date: { type: Date, default: Date.now },
  });

export default global.models.WatchList;