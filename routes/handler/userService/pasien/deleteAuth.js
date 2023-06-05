const apiAdapter = require('../../../apiAdapter');
const {
  URL_USER_SERVICE
} = process.env;
const api = apiAdapter(URL_USER_SERVICE);

module.exports = async (req, res) => {
  try {
    const pasienId = req.user.data.id;
    const user = await api.post(`${URL_USER_SERVICE}/pasien/delete-access-to-dokter/${pasienId}`, req.body);
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
