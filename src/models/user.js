/* _id
652b87ffa1bbeb7ea42e33bb
name
"Andry"
last_name
"Cab"
email
"andry@gmail.com"
password
"$2a$10$dCvmvY2tK9Ape2rhe7nz9u9u7bqJNcMxb7MP674d7ZojSYnIKlKea"

profile_picture
Object
url
"https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Prof…"
public_id
""
socket_id
"Q4KQbI0wFsrJcyLxABAX"
phone_number
9982123213
authStrategy
"jwt"
refreshToken
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJiODdmZmExYmJlYjdlY…"

history
Array
createdAt
2023-10-15T06:34:39.563+00:00
updatedAt
2023-11-13T22:13:40.382+00:00 */

const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_picture: { url: { type: String }, public_id: { type: String }, required: false },
    socket_id: { type: String, required: false },
    phone_number: { type: Number, required: true },
    authStrategy: { type: String, required: true },
    refreshToken: { type: String, required: false },
    history: { type: Array, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const userSchema = model('users', UserSchema)
module.exports = userSchema
