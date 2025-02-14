// This file mounts different routes on the different endpoints of the router
import express from "express";
import authRoutes from "../apps/auth/authRoute";

const router = express.Router({ caseSensitive: true });

router.use("/auth", authRoutes);

export default router;
