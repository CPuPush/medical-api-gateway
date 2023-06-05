const login = require('./login');
const logout = require('./logout');
const dokterValidation = require('./validationDokter');
const destroyDokter = require('./destroyDokter');
const getAdminFromAuth = require('./getAdminFromAuth');

module.exports = {
  login,
  logout,
  dokterValidation,
  destroyDokter,
  getAdminFromAuth
}