import SeatsService from '../Models/Services/Srvice-Seats.js';

class SeatsController {
  async getAllSeats(req, res) {
    try {
      const Seats = await SeatsService.getAllSeats();
      res.json({ Seats: Seats });
    } catch (error) {
      res.status(500).json({ error: 'שגיאה בשליפת הכיסאות' });
    }
  }
  
 
  
}

export default new SeatsController();