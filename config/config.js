require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "meeting_room_booking_system",
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  }
}
