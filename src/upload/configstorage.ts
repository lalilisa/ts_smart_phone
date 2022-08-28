import multer from "multer"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) 
        cb(null, filename + '-' + file.originalname )
    }
  })
   
 export const upload = multer({ storage: storage })