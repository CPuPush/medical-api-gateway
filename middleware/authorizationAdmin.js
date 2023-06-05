module.exports = async (req, res, next) => {
  const data = req.user;
  if(data.data.role !== "admin"){
    return res.status(403).json({
      status: "error",
      message: "FORBIDDEN FOR PASIEN & DOKTER"
    })
  }
  return next();
};