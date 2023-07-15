import { getPhotosService, createPhotoService, addCommentService } from '../services/image-service.js';


  export async function getPhotos(req, res) {

    const images = await getPhotosService();
    res.json(images);
  }

  export async function addComment(req, res) {
    const {_id, comment, user } = req.body;

    const addedComment = await addCommentService(_id, user, comment)

    if (addedComment.errors) {
        return res.status(500).json({ message: 'Failed to create comment' });
    }

    return res.status(201).json(addedComment);


  }

  export async function createPhoto(req,res) {
    const {name, artistName, describtion, img}= req.body
    const photo = await createPhotoService(name, artistName, describtion, img)
    if (photo.errors) {
        console.log(photo)
        return res.status(500).json({ message: 'Failed to create image' });

    }
    return res.status(201).json(photo);

  }

