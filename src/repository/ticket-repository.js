const { Op } = require("sequelize");
const { NotificationTicket } = require("../models/index");

class ticketRepository {
  async get(filter) {
    try {
      const response = await NotificationTicket.findAll({
        where: {
          status: filter.status,
          notificationTime: {
            [Op.lte]: new Date(),
          },
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(ticketId, data) {
    try {
      const response = await NotificationTicket.findByPk(ticketId);
      if (data.status) response.status = data.status;
      await response.save();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(data) {
    try {
      const response = await NotificationTicket.create(data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = ticketRepository;
