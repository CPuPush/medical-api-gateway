module.exports = async (req, res, next) => {
  const data = req.user;
  if(data.data.role !== "pasien"){
    return res.status(403).json({
      status: "error",
      message: "FORBIDDEN FOR DOKTER & ADMIN"
    })
  }
  return next();
};