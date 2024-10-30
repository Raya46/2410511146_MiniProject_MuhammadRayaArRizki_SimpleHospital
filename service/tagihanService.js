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

const updateTagihan = async(id, data) => {
    const tagihan = await prisma.tagihan.findUnique({
        where:{id:Number(id)},
        include:{
            merawat:true
        }
    })
    const merawat = await prisma.merawat.findUnique({
        where:{
            id: tagihan.merawatId
        }
    })
    const dokter = await prisma.dokter.findUnique({
        where:{
            id:Number(data.dokterId) || tagihan.merawat.dokterId 
        }
    })
    const pasien = await prisma.pasien.findUnique({
        where:{
            id:Number(data.pasienId) || Number(tagihan.pasienId)
        }
    })
    if(pasien.jenisPenyakit !== dokter.spesialis){
        return "Tidak bisa update, pasien tidak sinkron dengan dokter spesialis"
    }
    await prisma.merawat.update({
        where:{
            id: merawat.id
        },
        data:{
         pasienId:data.pasienId   
        }
    })
    return await prisma.tagihan.update({
        where:{
            id:Number(tagihan.id)
        },
        data:{
           ...data,
           statusTagihan:data.statusTagihan?.toUpperCase(),
            tanggalBayar:data.statusTagihan?.toUpperCase() === 'LUNAS' ? new Date().toISOString() : ''
        }
    })
}

export default {createTagihan,getTagihanByPasienId, getTagihanBelumLunas,getTagihan,updateTagihan}