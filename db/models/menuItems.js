const mongoose = require("../db.js");

const menuItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
menuItemsSchema.set("toJSON", {
  virtuals: true
});
// menu model
const MenuItems = mongoose.model("MenuItems", menuItemsSchema);

const getAll = async () => {
  try {
    const menuItems = await MenuItems.find();
    return menuItems;
  } catch (error) {
    return error;
  }
};

const getOne = async (id) => {
  try {
    const menuItem = await MenuItems.findById(id);
    return menuItem;
  } catch (error) {
    return error;
  }
};

const updateOne = async (id, body) => {
  const menuItem = await MenuItems.findByIdAndUpdate(id, body, { new: true });
  menuItem.updatedAt = Date.now();
  menuItem.save();
  return menuItem;
};

const create = async (body) => {
  try {
    const menuItem = await MenuItems.create(body);
    return menuItem;
  } catch (error) {
    return error;
  }
};

const removeOne = async (id) => {
  const menuItem = await MenuItems.findByIdAndDelete(id);
  return menuItem.id;
};

const searchItem = async (keyword) => {
  try {
    const menuItem = await MenuItems.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    });
    return menuItem;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  create,
  removeOne,
  searchItem,
  MenuItems
};
