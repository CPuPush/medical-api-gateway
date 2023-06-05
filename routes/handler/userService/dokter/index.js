const register = require('./register');
const login = require('./login');
const getAllDokter = require('./getAllDokter');
const logout = require('./logout');
const getDokterById = require('./getDokterById');
const getPasienWithGivenAuth = require('./getPasienWithGivenAuth');

module.exports = {
  register,
  login,
  getAllDokter,
  logout,
  getDokterById,
  getPasienWithGivenAuth
}