const apiAdapter = require("../../../apiAdapter");
const jwt = require("jsonwebtoken");
const {
  URL_USER_SERVICE,
  JWT_SECRET,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;
const api = apiAdapter(URL_USER_SERVICE);

module.exports = async (req, res) => {
  try {
    const user = await api.post(`${URL_USER_SERVICE}/dokter/login`, req.body);
    const data = user.data.data;
    /*
    {
      "id": 4,
      "nama": "fori okto pakpahan",
      "email": "asdfasssdf@gmail.com",
      "role": "pasien",
      "jenis_kelamin": "laki-laki"
    }
    */
    if (data.status === "menunggu" || data.status === "ditolak") {
      return res.status(403).json({
        status: "error",
        message:
          "Maaf, status Anda masih menunggu/ditolak. Silakan hubungi admin untuk informasi lebih lanjut.",
      });
    }
    const token = jwt.sign(
      {
        // payload
        data,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
      }
    );

    const refreshToken = jwt.sign(
      {
        data,
      },
      JWT_SECRET_REFRESH_TOKEN,
      {
        expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
      }
    );

    // simpan data to refresh_pasien_tokens
    await api.post(`${URL_USER_SERVICE}/refresh-token/dokter`, {
      dokterId: data.id,
      refresh_token: refreshToken,
    });

    return res.json({
      status: "success",
      data: {
        token,
        refreshToken,
        user: data,
      },
    });
  } catch (error) {
    if (error.code == "ECONNREFUSED") {
      return res.status(500).json({
        status: "error",
        message: "service unavailable",
      });
    } else {
      const { status, data } = error.response;
      return res.status(status).json(data);
    }
  }
};
