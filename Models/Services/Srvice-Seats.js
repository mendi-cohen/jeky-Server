import Seats from '../DataBase/Data-Seats.js';


class SeatsService {
  async getAllSeats() {
    return await Seats.findAll({
    
    });
}
  
}

export default new SeatsService();