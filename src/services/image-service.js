import {PhotoModel} from '../models/image.js'

export async function getPhotosService(offset = 0, limit = 5) {
    // const images = await PhotoModel.find().skip(offset).limit(limit)
    const images = await PhotoModel.find()

    return images
}

export async function createPhotoService(name,artistName,describtion,img) {
    try {
    
        const newImage = new PhotoModel({
          name,
          artistName,
          describtion,
          img,
        });
        const createdImage = await newImage.save();
        return createdImage
      } catch (error) {
        return error
      }
}



export async function addCommentService(_id, user, comment) {
  try {
    const photo = await PhotoModel.findById(_id);
    if (!photo) {
        return res.status(404).json({ error: 'Photo not found' });
    }
    photo.comments.push({ user, comment });
    await photo.save();
    res.json(photo);
} catch (error) {
    res.status(500).json({ error: 'Server error' });
}
}







