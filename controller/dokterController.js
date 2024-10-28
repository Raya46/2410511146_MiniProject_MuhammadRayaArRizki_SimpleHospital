import dokterService from "../service/dokterService";

export const getDokter = async (req, res) => {
  try {
    const dokter = await dokterService.getDokter();
    res.status(200).json(dokter);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getDokterBySpesialist = async (req, res) => {
  try {
    const dokter = await dokterService.getDokterBySpesialist(
      req.params.spesialis
    );
    res.status(200).json(dokter);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createDokter = async (req, res) => {
  try {
    const dokter = await dokterService.createDokter(req.body);
    res.status(201).json(dokter);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deleteDokter = async (req, res) => {
  try {
    const dokter = await dokterService.deleteDokter(req.params.id);
    res.status(200).json(dokter);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updateDokter = async (req, res) => {
  try {
    const dokter = await dokterService.updateDokter(req.params.id, req.body);
    res.status(200).json(dokter);
  } catch (error) {
    res.status(500).json(error);
  }
};
