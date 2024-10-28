import { Router } from "express";
import { getTagihan, getTagihanBelumLunas, getTagihanByPasienId, updateTagihan } from "../controller/tagihanController";
const router = Router()

router.get("/:pasienId", getTagihanByPasienId)
router.put("/:id", updateTagihan)
router.get("/", getTagihan)
router.get("/belum_lunas/:pasienId", getTagihanBelumLunas)

export default router