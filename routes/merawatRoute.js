import { Router } from "express";
import {
  createMerawat,
  createMerawatById,
  deleteMerawat,
  getMerawat,
  updateMerawat,
} from "../controller/merawatController";

const router = Router();

router.get("/", getMerawat);
router.post("/create-merawat", createMerawat);
router.post("/create-merawat-id", createMerawatById);
router.delete("/:id", deleteMerawat);
router.put("/:id", updateMerawat);

export default router;
