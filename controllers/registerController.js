const User = require("../data/User");
const bcrypt = require("bcrypt");
const handleUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and pasword are required." });
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //conflit
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    console.log(result);

    res.status(201).json({ msg: "new user created" });
  } catch (err) {
    res.status(500).json({ message: err.message }); //server error
  }
};

module.exports = { handleUser };
