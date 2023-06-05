const express = require('express');
const router = express.Router();
const medicalController = require('./handler/medicalService');
const authentication = require('../middleware/authentication');
const authorizationDokter = require('../middleware/authorizationDokter');

router.post('/data/:pasienId', authentication, authorizationDokter, medicalController.medical);

router.post('/anamnesa/:tbMedicalRecordId',authentication, authorizationDokter, medicalController.anamnesa);
router.post('/pemeriksaan-fisik/:tbMedicalRecordId', authentication, authorizationDokter, medicalController.pemeriksaanFisik);
router.post('/laboratorium/:tbMedicalRecordId', authentication, authorizationDokter, medicalController.laboratorium);
router.post('/pemeriksaan-lainnya/:tbMedicalRecordId', authentication, authorizationDokter, medicalController.pemeriksaanLainnya);
router.post('/kesimpulan/:tbMedicalRecordId', authentication, authorizationDokter, medicalController.kesimpulan);
router.get('/:tbMedicalRecordId', medicalController.getMedical)

router.get('/data/medical', authentication, medicalController.getMedicalByPasienId);
router.get('/data/medical/:pasienId', authentication, medicalController.getMedicalByPasienIdforDokter);



module.exports = router;
