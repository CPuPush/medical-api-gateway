const apiAdapter = require('../../../apiAdapter');
const {
  URL_USER_SERVICE
} = process.env;
const api = apiAdapter(URL_USER_SERVICE);

module.exports = async (req, res) => {
  try {
    const id = req.user.data.id;
    console.log(id);
    const user = await api.get(`${URL_USER_SERVICE}/dokter/${id}`);
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
