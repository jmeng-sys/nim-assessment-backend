const mongoose = require("../db.js");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItems"
      },

      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    required: true,
    enum: ["pending", "confirmed", "delivered", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
orderSchema.set("toJSON", {
  virtuals: true
});
// orderSchema.statics.calcTotal = (items) =>
//   items.reduce((total, item) => {
//     if (item.status === "confirmed" || item.status === "delivered")
//       return (total + item.price * item.quantity);
//     return total;
//   }, 0);

orderSchema.statics.calcTotal = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

// order model
const Orders = mongoose.model("Orders", orderSchema);

const getAll = async () => {
  // populate each item
  try {
    const orders = await Orders.find().populate("items.item");
    return orders;
  } catch (error) {
    return error;
  }
};

const getOne = async (id) => {
  const order = await Orders.findById(id).populate("items.item");
  return order;
};

const create = async (body) => {
  const order = await Orders.create(body);
  return order;
};

const getTotalSales = async () => {
  const startDate = new Date("2022-01-01");
  const endDate = new Date("2022-07-31");

  const orders = await Orders.find({
    updatedAt: { $gte: startDate, $lte: endDate }
  }).populate("items.item");

  const totalSales = await orders.reduce((total, order) => {
    const itemsTotal = order.items.reduce(
      (total2, item) => total2 + item.item.price * item.quantity,
      0
    );
    return total + itemsTotal;
  }, 0);

  return JSON.stringify({ TotalSales: `$${totalSales}` });
};

const update = async (id, body) => {
  const order = await Orders.findByIdAndUpdate(id, body, { new: true });
  return order;
};

const remove = async (id) => {
  const order = await Orders.findByIdAndDelete(id);
  return order.id;
};

const getByStatus = async (status) => {
  const orders = await Orders.find({ status }).populate("items");
  return orders;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByStatus,
  Orders,
  getTotalSales
};
