import express from 'express';
import { json } from 'body-parser';
import webpack from 'webpack';
import graphqlHTTP from 'express-graphql';
import WebpackDevServer from 'webpack-dev-server';
import schema from './src/models/schema.js';
import { webpackConfig } from './webpack.config';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise; //use native Promise for mongoose as per http://mongoosejs.com/docs/promises.html
mongoose.connect('mongodb://localhost:27017/jukebox');

const APP_PORT = 3000;
const GRAPHQL_PORT = 4000;

// Expose a GraphQL endpoint
const graphQLServer = express();

// parse body as json
graphQLServer.use(json());

graphQLServer.use('/graphql', graphqlHTTP({
	schema: schema,
	graphiql: true,
	formatError: (error) => ({
		message: error.message,
		stack: error.stack.split('\n'),
	}),
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
	`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

const app = new WebpackDevServer(webpack(webpackConfig), {
	contentBase: 'public/',
	proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
	historyApiFallback: true,
	publicPath: webpackConfig.output.publicPath,
	hot: true,
	stats: {colors: true},
});
// app.use('/', express.static(path.resolve(__dirname, 'public')));
// Serve static resources
app.listen(APP_PORT, () => {
	console.log(`App is now running on http://localhost:${APP_PORT}`);
});
