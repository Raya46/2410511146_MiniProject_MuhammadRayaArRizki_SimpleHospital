import { Router } from "express";
import {
  createPasien,
  deletePasien,
  getPasien,
  getPasienByPenyakit,
  updatePasien,
} from "../controller/pasienController";

const router = Router();

router.get("/", getPasien);
router.get("/:penyakit", getPasienByPenyakit);
router.post("/create-pasien", createPasien);
router.delete("/:id", deletePasien);
router.put("/:id", updatePasien);

export default router;
