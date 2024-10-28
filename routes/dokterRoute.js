import { Router } from "express";
import {
  createDokter,
  deleteDokter,
  getDokter,
  getDokterBySpesialist,
  updateDokter,
} from "../controller/dokterController";

const router = Router();

router.get("/", getDokter);
router.get("/:spesialis", getDokterBySpesialist);
router.post("/create-dokter", createDokter);
router.delete("/:id", deleteDokter);
router.put("/:id", updateDokter);

export default router;
