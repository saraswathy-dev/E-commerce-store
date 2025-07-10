import express from "express";
const router = express.Router();

router.get("/analytics", (req, res) => {
  res.status(200).json({
    message: "Analytics data will be here",
    data: {
      totalUsers: 1000,
      totalOrders: 500,
      totalRevenue: 150000,
    },
  });

})