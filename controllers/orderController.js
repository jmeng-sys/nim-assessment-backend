const Orders = require("../db/models/orders.js");

const getAll = async (req, res) => {
  try {
    const order = await Orders.getAll();
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const order = await Orders.getOne(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const order = await Orders.create(req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const order = await Orders.update(req.params.id, req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const order = await Orders.remove(req.params.id);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getByCustomer = async (req, res) => {
  try {
    const orders = await Orders.getByCustomer(req.params.id);
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getByStatus = async (req, res) => {
  try {
    const orders = await Orders.getByStatus(req.params.status);
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTotalSales = async (req, res) => {
  try {
    const total = await Orders.getTotalSales();
    res.send(total);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByCustomer,
  getByStatus,
  getTotalSales
};
