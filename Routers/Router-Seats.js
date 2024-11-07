import express from 'express';
import SeatsController from '../Controllers/Controll-Seats.js';


const router = express.Router();

router.get('/getAllSeats', SeatsController.getAllSeats);



export default router;