import { asalRumahSakit } from "../asalRumahSakit";
import prisma from "../database";

const getDokter = async () => {
  return await prisma.dokter.findMany();
};

const getDokterBySpesialist = async (spesialis) => {
  return await prisma.dokter.findMany({
    where: {
      spesialis: spesialis,
    },
  });
};

const createDokter = async (data) => {
  const dokter = await prisma.dokter.create({
    data: {
      ...data,
      nomorTelepon: Number(data.nomorTelepon),
      asalRumahSakit: asalRumahSakit[data.asalRumahSakit],
    },
  });
  return dokter;
};

const updateDokter = async (id, data) => {
  return await prisma.dokter.update({
    where: {
      id: Number(id),
    },
    data: {
      ...data,
      nomorTelepon: Number(data.nomorTelepon),
      asalRumahSakit: asalRumahSakit[data.asalRumahSakit],
    },
  });
};

const deleteDokter = async (id) => {
  return await prisma.dokter.delete({
    where: {
      id: Number(id),
    },
  });
};

export default {
  getDokter,
  getDokterBySpesialist,
  createDokter,
  updateDokter,
  deleteDokter,
};
