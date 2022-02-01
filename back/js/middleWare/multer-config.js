const multer = require('multer');

const fileDestination = "images";

const MIME_TYPES = 
{
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};



const storage = multer.diskStorage(
{
  destination: (req, file, callback) => 
  {
    callback(null, fileDestination);
  },
  filename: (req, file, callback) => 
  {
    const name      = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// It means we accept a single file with the field name image.
module.exports = multer({storage: storage}).single('image');