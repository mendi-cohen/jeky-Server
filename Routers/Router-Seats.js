import express from 'express';
import OrdersController from '../Controllers/Controll-Seats.js';


const router = express.Router();

router.get('/getAllSeats', OrdersController.getAllSeats);



export default router;