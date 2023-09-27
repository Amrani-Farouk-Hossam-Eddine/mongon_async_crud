const User = require("../data/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users" });
  res.json(users);
};

const deletUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "id is required." });
  const user = await User.findOne({ _id: req.params.id });
  if (!user) return res.status(204).josn({ meesage: "user not found." });
  const result = await user.deleteOne({ _id: req.params.id });
  res.json(result);
};

module.exports = { getAllUsers, deletUser };
