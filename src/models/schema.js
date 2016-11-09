import {SongTypeComposer as SongTC} from './Song';
import {UserTypeComposer as UserTC} from './User';
import { ComposeStorage } from 'graphql-compose';
import composeWithRelay from 'graphql-compose-relay';

const GQC = new ComposeStorage();

const RootQueryTC = GQC.rootQuery();
composeWithRelay(RootQueryTC);

// To comply to Relay's GraphQL specs, we need a root viewer field
const ViewerTC = GQC.get('Viewer');
GQC.rootQuery().addFields({
	viewer: {
		type: ViewerTC.getType(),
		description: 'Data under client context',
		resolve: () => ({}),
	},
});

ViewerTC.addFields({
	songConnection: SongTC.getResolver('connection'),
	songs: SongTC.getResolver('findMany'),
	song: SongTC.getResolver('findOne'),
	_song: SongTC.getResolver('findById'),

	userConnection: UserTC.getResolver('connection'),
	users: UserTC.getResolver('findMany'),
	user: UserTC.getResolver('findOne'),
	_user: UserTC.getResolver('findById'),
});

GQC.rootMutation().addFields({
	songCreate: SongTC.getResolver('createOne'),
	_songUpdate: SongTC.getResolver('updateById'),
	songUpdate: SongTC.getResolver('updateOne'),
	songsUpdate: SongTC.getResolver('updateMany'),
	_songRemove: SongTC.getResolver('removeById'),
	songRemove: SongTC.getResolver('removeOne'),
	songsRemove: SongTC.getResolver('removeMany'),

	userCreate: UserTC.getResolver('createOne'),
	_userUpdate: UserTC.getResolver('updateById'),
	userUpdate: UserTC.getResolver('updateOne'),
	usersUpdate: UserTC.getResolver('updateMany'),
	_userRemove: UserTC.getResolver('removeById'),
	userRemove: UserTC.getResolver('removeOne'),
	usersRemove: UserTC.getResolver('removeMany'),
});

export default GQC.buildSchema();
