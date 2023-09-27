const User = require("../data/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  const result = foundUser.save();
  console.log(result);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
  res.sendStatus(204);
};

module.exports = { handleLogout };
