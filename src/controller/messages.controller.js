const messagesService = require("../services/messages.service");

const getDirectMesages = async (req, res) => {
  try {
    const directMessages = await messagesService.getDirectMesages(req, res);
    return directMessages;
  } catch (erorr) {
    console.log(erorr);
  }
};

module.exports = {
  getDirectMesages,
};
