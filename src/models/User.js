import mongoose, { Schema } from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';
import composeWithRelay from 'graphql-compose-relay';

export const UserSchema = new Schema ({
	_id: String,
	userName : String,
	isHost : Boolean,
	isOnline : Boolean,
	lastModified : Date,
	balance : Number,
});

export const UserModel = mongoose.model('user', UserSchema);

const customOptions = {}; // left it empty for simplicity

export const UserTypeComposer = composeWithRelay(composeWithMongoose(UserModel, customOptions));
