const apiAdapter = require("../../../apiAdapter");
const { URL_USER_SERVICE } = process.env;
const api = apiAdapter(URL_USER_SERVICE);

module.exports = async (req, res) => {
  try {
    const user = await api.post(
      `${URL_USER_SERVICE}/dokter/register`,
      req.body
    );
    return res.json(user.data);
  } catch (error) {
    if (error.code == "ECONNREFUSED") {
      return res.status(500).json({
        status: "error",
        message: URL_USER_SERVICE,
      });
    } else {
      const { status, data } = error.response;
      return res.status(status).json(data);
    }
  }
};
