import prisma from "../database"

const createTagihan = async(data) => {
    return await prisma.tagihan.create({
        data:{
            ...data
        }
    })
}

const getTagihanByPasienId = async(pasienId) => {
    return await prisma.tagihan.findMany({
        where:{
            pasienId:Number(pasienId)
        }
    })
}

const getTagihan = async() => {
    return await prisma.tagihan.findMany()
}

const getTagihanBelumLunas = async(pasienId) => {
    
    const tagihan = await prisma.tagihan.findMany({
        where:{
            pasienId:Number(pasienId),
            statusTagihan: "BELUM_LUNAS"
        }
    })
    let totalBiaya = tagihan.reduce((total, currentTagihan) => {
        return total + currentTagihan.jumlahBiaya;
      }, 0);
    return {totalBiaya,tagihan}
}

const updateTagihan = async (id, data) => {
    const tagihan = await prisma.tagihan.findUnique({
        where: { id: Number(id) },
        include: { merawat: true },
    });

    if (!tagihan) {
        return "Tagihan tidak ditemukan";
    }

    const dokterId = data.dokterId || tagihan.merawat.dokterId;
    const pasienId = data.pasienId || tagihan.pasienId;

    const [dokter, pasien] = await Promise.all([
        prisma.dokter.findUnique({ where: { id: Number(dokterId) } }),
        prisma.pasien.findUnique({ where: { id: Number(pasienId) } }),
    ]);

    if (!dokter || !pasien || pasien.jenisPenyakit !== dokter.spesialis) {
        return "Tidak bisa update, pasien tidak sinkron dengan dokter spesialis";
    }

    if (data.merawatId) {
        await prisma.merawat.update({
            where: { id: Number(data.merawatId) },
            data: { pasienId: tagihan.pasienId }
        });
    }

    const updatedTagihan = await prisma.tagihan.update({
        where: { id: Number(id) },
        data: {
            ...data,
            statusTagihan: data.statusTagihan?.toUpperCase(),
            tanggalBayar: data.statusTagihan?.toUpperCase() === 'LUNAS' ? new Date().toISOString() : ''
        },
    });

    return updatedTagihan;
};




export default {createTagihan,getTagihanByPasienId, getTagihanBelumLunas,getTagihan,updateTagihan}