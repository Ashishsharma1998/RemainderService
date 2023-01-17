const { createNotification } = require("../services/email-service");

const create = async (req, res) => {
  try {
    console.log(req.body);
    const response = await createNotification(req.body);
    return res.status(201).json({
      data: response,
      success: true,
      message: "successfully registered an email remainder",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to register an email remainder",
      err: error,
    });
  }
};

module.exports = {
  create,
};
