const apiAdapter = require('../../apiAdapter');
const {
  URL_MEDICAL_SERVICE
} = process.env;
const api = apiAdapter(URL_MEDICAL_SERVICE);

module.exports = async (req, res) => {
  try {
    const pasien_id = req.user.data.id;
    console.log(pasien_id);
    const user = await api.get(`${URL_MEDICAL_SERVICE}/medical-record/data/medical/${pasien_id}`);
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
