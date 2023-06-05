module.exports = async (req, res, next) => {
  const data = req.user;
  if(data.data.status === "menunggu" || data.data.status ==="ditolak"){
    return res.status(403).json({
      status: "error",
      message: "please waiting for admin to approve"
    })
  }
  if(data.data.role !== "dokter"){
    return res.status(403).json({
      status: "error",
      message: "FORBIDDEN FOR PASIEN & ADMIN"
    })
  }
  return next();
};