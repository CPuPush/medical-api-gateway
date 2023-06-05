const apiAdapter = require('../../apiAdapter');
const {
  URL_MEDICAL_SERVICE,
  URL_USER_SERVICE
} = process.env;

const api = apiAdapter(URL_MEDICAL_SERVICE);
const apis = apiAdapter(URL_USER_SERVICE);

module.exports = async (req, res) => {
  try {
    const {pasienId} = req.params;
    const dokterId = req.user.data.id;
    console.log(dokterId);
    console.log(pasienId);
    const requestBody = {
      ...req.body,
      dokterId
    }
    const data = await apis.get(`${URL_USER_SERVICE}/dokter/pasienAuth/${dokterId}`);
    let trigger = false;
    for(let i=0; i < data.data.data.length; i++){
      if(data.data.data[i].pasienId == pasienId){
        trigger = true;
        break
      }
    }

    if(trigger){
      await apis.get(`${URL_USER_SERVICE}/pasien/${pasienId}`);
      const user = await api.post(`${URL_MEDICAL_SERVICE}/medical-record/data/${pasienId}`, requestBody);
      return res.json(user.data);
    }else{
      return res.status(403).json({
        status: 'error',
        message: 'Autorisasi belum diberikan'
      })
    }
    
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
