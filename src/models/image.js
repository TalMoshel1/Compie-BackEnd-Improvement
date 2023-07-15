import mongoose from 'mongoose';


const PhotoSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    artistName: { type: String, required: true },
    describtion: { type: String, required: true },
    img: { type: String, required: true },
    comments: { type: [{}], default: [] }
});

export const PhotoModel = mongoose.model('Image', PhotoSchema)


