const apiAdapter = require('../../../apiAdapter');
const {
  URL_USER_SERVICE
} = process.env;
const api = apiAdapter(URL_USER_SERVICE);

module.exports = async (req, res) => {
  try {
    const dokterId = req.user.data.id;
    const user = await api.get(`${URL_USER_SERVICE}/dokter/pasienAuth/${dokterId}`);
    return res.json(user.data);
  } catch (error) {
    if(error.code == 'ECONNREFUSED'){
      return res.status(500).json({
        status: 'error',
        message: 'service unavailable'
      })
    }else{
      const {status, data} = error.response;
      return res.status(status).json(data);
    }
  }
};
