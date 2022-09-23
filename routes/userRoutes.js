import express from 'express'
import crudController from '../controller/crudController.js';
const router = express.Router();
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ path.extname(file.originalname))
    }
  })
  

const upload = multer({
    storage:storage
}).single("image")


//public route

router.post('/post',upload,crudController.post)
router.get('/get',crudController.get)
router.get('/getbyid/:id',crudController.getByid)
router.put('/update/:id',upload,crudController.update)
router.delete('/delete/:id',crudController.delete)
// router.patch('/todoupdate/:id',upload,todoController.updateTodo)


export default router