require('dotenv').config()
const { user } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../handler/tokenHandler')

class authController {
    static async register(req,res,next) {
        try {
            const {username,password, role} = req.body
            const hashed = await bcrypt.hash(password,parseInt(process.env.SALT))
            const userCreated = await user.create({
                    username: username,
                    password: hashed,
                    role: role
                })
            return res.status(201).json({message: "successfully created user", data: userCreated})
        } catch (error) {
            next(error)
        }
    }

    static async login(req,res) {
        try {
            const findUser = await user.findOne({where: {username: req.body.username}})
            if(!findUser) return res.status(400).json({message: "wrong username"})
            const {password, ...payload} = findUser.dataValues
            const verifiedPassword = await bcrypt.compare(req.body.password, password)
            if(!verifiedPassword) return res.status(400).json({message: "wrong password"})
            const token = generateToken(payload)
            res.cookie('token', token, {
                maxAge: 86400 * 1000,
                httpOnly: true
            })
            return res.status(200).json({message: "login success"})              
        } catch (error) {
            res.status(500).json({message: "Network error"})
        }
    }

}

module.exports = authController