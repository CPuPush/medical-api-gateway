const apiAdapter = require('../../apiAdapter');
const {
  URL_MEDICAL_SERVICE
} = process.env;
const api = apiAdapter(URL_MEDICAL_SERVICE);

module.exports = async (req, res) => {
  try {
    const {pasienId} = req.params;
    console.log(pasienId);
    const user = await api.get(`${URL_MEDICAL_SERVICE}/medical-record/data/medical/${pasienId}`);
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
