const { booking_record } = require('../models')
const { Op } = require("sequelize")
const { getTodaysDate, getHours } = require('../handler/timeHandler')
const generateUID = require('../handler/idHandler')

class Booking {
    // untuk booking ruangan
    static async createSlot(req,res,next) {
        try {
            const { id } = req.data
            const payload = {
                user_id: id,
                room_id: req.body.room_id,
                book_code: generateUID(),
                tanggal: req.body.tanggal,
                jamMasuk: req.body.jamMasuk,
                jamSelesai: req.body.jamSelesai,
                kegunaan: req.body.kegunaan
            }
            if(payload.jamMasuk < "08:00" || payload.jamMasuk > "22:00") return res.status(400).json({message: "invalid time input"})
            else if(payload.jamSelesai <= payload.jamMasuk || payload.jamSelesai > "23:00") return res.status(400).json({message: "invalid time input"})
            else if(payload.tanggal < getTodaysDate()) return res.status(400).json({message: "cannot set date before current date"})
            const findDate = await booking_record.findOne({where:{tanggal:payload.tanggal}})
            if(!findDate){
                const createRecord = await booking_record.create(payload)
                return res.status(200).json({message: "successfully booked", data: createRecord})
            }
            if(payload.jamMasuk < getHours()) return res.status(400).json({message:"cannot set hour berfore current time"})
            const findRoom = await booking_record.findOne({where:{
                tanggal: payload.tanggal,
                room_id: payload.room_id,
                [Op.or]:[
                    {
                       jamMasuk:{
                        [Op.and]:[{[Op.gte]:payload.jamMasuk},{[Op.lte]:payload.jamSelesai}]
                       } 
                    },
                    {
                        jamSelesai:{
                         [Op.and]:[{[Op.gte]:payload.jamMasuk},{[Op.lte]:payload.jamSelesai}]
                        }
                    }
                ]
            }})
            if(findRoom) return res.status(400).json({message: "Room already book within that date and hour"})
            const created = await booking_record.create(payload)
            return res.status(200).json({message: "successfully booked", data: created})
        } catch (error) {
            next(error)
        }
    }
    // melihat room yang digunakan
    static async lookSlot(req,res,next) {
        try {
            const lookRoom = await booking_record.findAll({
                include: ["booking_room", "booking_user"],
                attributes:["id", "jamMasuk", "jamSelesai", "tanggal", "room_id", "user_id"],
                order: [['jamMasuk','ASC']],
                where: {
                    tanggal: getTodaysDate()
                },
            })
            const newData = lookRoom.map(val => { return {
                    book_id: val.id,
                    booked_by: val.booking_user.username,
                    room: val.booking_room.name,
                    hour_start: val.jamMasuk,
                    hour_end: val.jamSelesai,
                    purpose: val.kegunaan
                }}
            ) 
            return res.status(200).json({data: newData})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    // menghapus item dari list booking 
    static async deleteSlot(req,res,next) {
        try {
            const { id } = req.params
            const findId = await booking_record.findByPk(id)
            if(!findId) return res.status(400).json({message: "ID not found"})
            await booking_record.destroy({where:{id:id}})
            return res.status(200).json({message: "delete success"})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    // update booking
    static async updateSlot(req,res,next) {
        try {
            const { id } = req.data
            const payload = {
                user_id: id,
                room_id: req.body.room_id,
                tanggal: req.body.tanggal,
                jamMasuk: req.body.jamMasuk,
                jamSelesai: req.body.jamSelesai,
                kegunaan: req.body.kegunaan
            }
            if(payload.jamMasuk < "08:00" || payload.jamMasuk > "22:00") return res.status(400).json({message: "invalid time input"})
            else if(payload.jamSelesai <= payload.jamMasuk || payload.jamSelesai > "23:00") return res.status(400).json({message: "invalid time input"})
            else if(payload.tanggal < getTodaysDate()) return res.status(400).json({message: "cannot set date before current date"})
            const findBookingCode = await booking_record.findOne({where:{id:req.body.book_code}})
            if(!findBookingCode) return res.status(400).json({message: "Book ID is not found"})
            const findDate = await booking_record.findOne({where:{tanggal:payload.tanggal}})
            if(!findDate){
                await booking_record.update(payload,{where:{id:req.body.book_code}})
                return res.status(200).json({message: "successfully updated"})
            }
            if(payload.jamMasuk < getHours()) return res.status(400).json({message:"cannot set hour berfore current time"})
            const findRoom = await booking_record.findOne({where:{
                tanggal: payload.tanggal,
                room_id: payload.room_id,
                [Op.or]:[
                    {
                       jamMasuk:{
                        [Op.and]:[{[Op.gte]:payload.jamMasuk},{[Op.lte]:payload.jamSelesai}]
                       } 
                    },
                    {
                        jamSelesai:{
                         [Op.and]:[{[Op.gte]:payload.jamMasuk},{[Op.lte]:payload.jamSelesai}]
                        }
                    }
                ]
            }})
            if(findRoom) return res.status(400).json({message: "Room already book within that date and hour"})
            await booking_record.update(payload,{where:{id:req.body.book_code}})
            return res.status(200).json({message: "successfully updated"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Booking