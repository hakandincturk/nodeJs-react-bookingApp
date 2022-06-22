import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	price: {
		type: Number,
		required: true,
		unique: true
	},
	maxPeople: {
		type: Number,
		required: true
	},
	desc: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	},
	roomNumbers: [ {
		number: Number,
		unavailableDates: {type: [ Date ]}
	} ]
  
}, {timestamps: true});

export default mongoose.model('Rooms', RoomSchema);