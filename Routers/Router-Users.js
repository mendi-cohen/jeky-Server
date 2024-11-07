import express from 'express';
import UsersController from '../Controllers/Controll-Users.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/getAllUsers', UsersController.getAllUsers);
router.post('/addUser', upload.single('image'), UsersController.AddUser);

export default router;