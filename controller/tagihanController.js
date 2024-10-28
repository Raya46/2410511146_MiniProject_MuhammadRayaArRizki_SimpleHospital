import tagihanService from "../service/tagihanService"

export const getTagihan = async(req,res) => {
    try {
        const tagihan = await tagihanService.getTagihan()
        res.status(200).json(tagihan)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getTagihanBelumLunas = async(req,res) => {
    try {
        const tagihan = await tagihanService.getTagihanBelumLunas(req.params.pasienId)
        res.status(200).json(tagihan)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const getTagihanByPasienId = async(req,res) => {
    try {
        const tagihan = await tagihanService.getTagihanByPasienId(req.params.pasienId)
        res.status(200).json(tagihan)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateTagihan = async(req,res) => {
    try {
        console.log(req.params.id,req.body);
        const tagihan = await tagihanService.updateTagihan(req.params.id,req.body)
        res.status(200).json(tagihan)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}