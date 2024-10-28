import pasienService from "../service/pasienService";

export const getPasien = async (req, res) => {
  try {
    const pasien = await pasienService.getPasien();
    res.status(200).json(pasien);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPasienByPenyakit = async (req, res) => {
  try {
    const pasien = await pasienService.getPasienByPenyakit(req.params.penyakit);
    res.status(200).json(pasien);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createPasien = async (req, res) => {
  try {
    const pasien = await pasienService.createPasien(req.body);
    res.status(201).json(pasien);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deletePasien = async (req, res) => {
  try {
    const pasien = await pasienService.deletePasien(req.params.id);
    res.status(200).json(pasien);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updatePasien = async (req, res) => {
  try {
    console.log(req.body);
    const pasien = await pasienService.updatePasien(req.params.id, req.body);
    res.status(200).json(pasien);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
