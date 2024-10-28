import merawatService from "../service/merawatService";

export const createMerawat = async (req, res) => {
  try {
    console.log(req.body);
    const merawat = await merawatService.createMerawat(req.body);
    res.status(201).json(merawat);
  } catch (error) {
    console.log(req.body);
    console.log(error);
    res.status(500).json(error);
  }
};

export const createMerawatById = async(req,res) => {
  try {
    const merawat = await merawatService.createMerawatById(req.body)
    res.status(201).json(merawat)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

export const getMerawat = async (req, res) => {
  try {
    const merawat = await merawatService.getMerawat();
    res.status(200).json(merawat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteMerawat = async (req, res) => {
  try {
    const merawat = await merawatService.deleteMerawat(req.params.id);
    res.status(200).json(merawat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const updateMerawat = async (req, res) => {
  try {
    console.log(req.body, req.params.id);
    const merawat = await merawatService.updateMerawat(req.params.id, req.body);
    res.status(200).json(merawat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
