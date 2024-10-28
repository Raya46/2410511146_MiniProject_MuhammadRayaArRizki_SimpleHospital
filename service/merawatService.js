import { asalKotaPasien } from "../asalKotaPasien";
import { asalRumahSakit } from "../asalRumahSakit";
import prisma from "../database";
import dokterService from "./dokterService";
import pasienService from "./pasienService";
import tagihanService from "./tagihanService";

const createMerawat = async (data) => {
  console.log(data);
  let dokter = await prisma.dokter.findFirst({
    where: { nama: data.namaDokter },
  });

  if (!dokter) {
    dokter = await dokterService.createDokter({
      nama: data.namaDokter,
      spesialis: "UMUM",
      nomorTelepon: Number("0"),
      asalRumahSakit: 0,
    });
  }

  let pasien = await prisma.pasien.findFirst({
    where: { nama: data.namaPasien },
  });

  if (!pasien) {
    pasien = await pasienService.createPasien({
      nama: data.namaPasien,
      jenisPenyakit: "UMUM", 
      asalKota: 0,
    });
  }

  if (dokter.spesialis !== pasien.jenisPenyakit) {
    return "Dokter tidak menangani penyakit ini";
  }

  const merawat = await prisma.merawat.create({
    data: {
      pasienId: Number(pasien.id),
      dokterId: Number(dokter.id),
      nomorRuangan: Number(data.nomorRuangan),
      status: data.status.toUpperCase(),
    },
  });

  let jumlahBiaya = 0;
  if (data.status.toUpperCase() === 'CHECKUP') {
    jumlahBiaya = 150000;
  } else if (data.status.toUpperCase() === 'RAWAT') {
    jumlahBiaya = 300000;
  }

  const tagihanData = {
    pasienId: Number(pasien.id),
    jumlahBiaya: jumlahBiaya,
    merawatId: merawat.id,
    statusTagihan: data.statusTagihan?.toUpperCase() || 'BELUM_LUNAS',
    tanggalBayar: data.statusTagihan?.toUpperCase() === 'LUNAS' || data.status === 'SELESAI' ? new Date().toISOString() : ''
  };

  await tagihanService.createTagihan(tagihanData);

  return merawat;
};

const createMerawatById = async(data) => {
  const dokter = await prisma.dokter.findUnique({
    where:{
      id:Number(data.dokterId)
    }
  })
  const pasien = await prisma.pasien.findUnique({
    where:{
      id:Number(data.pasienId)
    }
  })
  if(dokter.spesialis !== pasien.jenisPenyakit) {
    return "Dokter tidak menangani penyakit ini"
  }
  const merawat = await prisma.merawat.create({
    data: {
      dokterId: Number(data.dokterId),
      pasienId: Number(data.pasienId),
      nomorRuangan: data.nomorRuangan,
      status: data.status.toUpperCase(),
    },
  });

  let jumlahBiaya = 0;
  if (data.status.toUpperCase() === 'CHECKUP') {
    jumlahBiaya = 150000;
  } else if (data.status.toUpperCase() === 'RAWAT') {
    jumlahBiaya = 300000;
  }

  const tagihanData = {
    pasienId: Number(pasien.id),
    jumlahBiaya: jumlahBiaya,
    merawatId: merawat.id,
    statusTagihan: data.statusTagihan?.toUpperCase() || 'BELUM_LUNAS',
    tanggalBayar: data.statusTagihan?.toUpperCase() === 'LUNAS' || data.status === 'SELESAI' ? new Date().toISOString() : ''
  };

  await tagihanService.createTagihan(tagihanData)

  return merawat;
}

const getMerawat = async () => {
  return await prisma.merawat.findMany();
};

const deleteMerawat = async (id) => {
  await prisma.tagihan.delete({
    where: { merawatId: Number(id) },
  });
  return await prisma.merawat.delete({
    where: {
      id: Number(id),
    },
  });

};

const updateMerawat = async (id, data) => {
  const merawat = await prisma.merawat.findUnique({
    where:{
      id:Number(id)
    }
  })
  const dokter = await prisma.dokter.findUnique({
    where:{
      id:Number(data.dokterId) || merawat.dokterId
    }
  })
  const pasien = await prisma.pasien.findUnique({
    where:{
      id:Number(data.pasienId) || merawat.pasienId
    }
  })
  if(dokter.spesialis !== pasien.jenisPenyakit) {
    return "Dokter tidak menangani penyakit ini"
  }

  const tagihan = await prisma.tagihan.findUnique({
    where: { merawatId: Number(id) }
  });
  
  let jumlahBiaya = 0;
  if (data.status?.toUpperCase() === 'CHECKUP') {
    jumlahBiaya = 150000;
  } else if (data.status?.toUpperCase() === 'RAWAT') {
    jumlahBiaya = 300000;
  } else {
    jumlahBiaya = tagihan.jumlahBiaya
  }

  const updatedMerawat = await prisma.merawat.update({
    where: { id: Number(id) },
    data: { ...data, status:data.status?.toUpperCase() },
  });


  if (tagihan) {
    await prisma.tagihan.update({
      where:{
        id: tagihan.id
      },
      data:{
        pasienId: updatedMerawat.pasienId,
        merawatId: updatedMerawat.id,
        jumlahBiaya: data.status?.toUpperCase() === 'SELESAI' ? tagihan.jumlahBiaya : jumlahBiaya,
        statusTagihan: data.status?.toUpperCase() === 'SELESAI' ? 'LUNAS' : 'BELUM_LUNAS',
        tanggalBayar:data.statusTagihan?.toUpperCase() === 'LUNAS' ? new Date().toISOString() : ''
      }
    })
  }

  return updatedMerawat;
};

export default {
  createMerawat,
  getMerawat,
  deleteMerawat,
  updateMerawat,
  createMerawatById
};
