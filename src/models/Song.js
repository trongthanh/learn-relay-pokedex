import mongoose, { Schema } from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';
import composeWithRelay from 'graphql-compose-relay';

export const SongSchema = new Schema ({
	_id: String,
	timeAdded: {
		type: Number, // timestamp float value
		index: true,
	},
	originalURL: {
		type: String,
		default: ''
	},
	origin: {
		type: String,
		enum: ['Soundcloud', 'NCT', 'Zing', 'YouTube'], default: ''
	},
	name: {
		index: true,
		type: String,
		default: ''
	},
	artist: {
		index: true,
		type: String,
		default: ''
	},
	streamURL: {
		type: String,
		default: ''
	},
	thumbURL: {
		type: String,
		default: ''
	},
	lyric: {
		type: String,
		default: ''
	},
	play: {
		type: Number,
		default: 0
	},
	isUp: {
		type: Boolean,
		default: false
	},
	author: {
		type: String
	}
});

export const SongModel = mongoose.model('song', SongSchema);

const customOptions = {}; // left it empty for simplicity

export const SongTypeComposer = composeWithRelay(composeWithMongoose(SongModel, customOptions));
