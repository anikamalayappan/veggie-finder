import mongoose from 'mongoose';

const cacheSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 }
});

export const Cache = mongoose.model('Cache', cacheSchema);