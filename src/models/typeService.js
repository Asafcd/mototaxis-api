import { Schema } from 'mongoose';

const typeServiceSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    name_icon: { type: String },
    title: { type: String },
    message: { type: String },
    statusMap: { type: String }
});

const TypeService = mongoose.model('TypeService', typeServiceSchema);
module.exports = TypeService