import { asalKotaPasien } from "../asalKotaPasien";
import prisma from "../database";

const getPasien = async () => {
  return await prisma.pasien.findMany();
};

const getPasienByPenyakit = async (penyakit) => {
  return await prisma.pasien.findMany({
    where: {
      jenisPenyakit: penyakit,
    },
  });
};

const createPasien = async (data) => {
  const pasien = await prisma.pasien.create({
    data: {
      ...data,
      asalKota: asalKotaPasien[data.asalKota],
    },
  });
  return pasien;
};

const updatePasien = async (id, data) => {
  return await prisma.pasien.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
      asalKota: asalKotaPasien[data.asalKota],
    },
  });
};

const deletePasien = async (id) => {
  return await prisma.pasien.delete({
    where: {
      id: Number(id),
    },
  });
};

export default {
  getPasien,
  getPasienByPenyakit,
  createPasien,
  updatePasien,
  deletePasien,
};
