const{ user } = require('../models')
const { verifyToken } = require('../handler/tokenHandler')

module.exports = async (req,res,next) => {
    try {
        const { token } = req.cookies
        if(!token) return res.status(401).json({message: "unauthorize"})
        const decoded = verifyToken(token)
        if(!decoded) return res.status(401).json({message: "unauthorize"})
        const findUser = await user.findOne({where: {username: decoded.username, id: decoded.id}})
        if(!findUser) return res.status(401).json({message: "unauthorize"})
        req.data = decoded
        next()
    } catch (error) {
        res.status(500).json({message: "Network error"})
    }
}