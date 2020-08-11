//dependencies
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './server/config/config.js';

//routes
import problemRouter from './server/routes/problemRouter.js';
import userRouter from './server/routes/userRouter.js';
import adminRouter from './server/routes/adminRouter.js';
import napRouter from './server/routes/napRouter.js';

const app = express();

//try single connection in mongoose
mongoose.connect(config.db.uri, {useNewUrlParser: true});
app.locals.db = mongoose.connection;
app.locals.db.on('error', console.error.bind(console, 'connection error:'));

//enable request logging for development debugging
app.use(morgan('dev'));

//body parsing middleware
app.use(bodyParser.urlencoded({
	extended: true
}));

//parses json files
app.use(bodyParser.json());

/* serve static files - see http://expressjs.com/en/starter/static-files.html */
app.use('/', express.static('./client/build'));
app.use(express.static('./client/build'))

//https://enable-cors.org/server_expressjs.html
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(cors());

//ROUTES
app.use('/api/problems/', problemRouter);
app.use('/api/user/', userRouter);
app.use('/api/admin/', adminRouter);
app.use('/api/nap/', napRouter);

app.all('/*', (req, res) => {
	// res.status(201).json({message: "nothing here!"});
	res.sendFile(path.resolve("./client/build/index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App now listening on port ${PORT}`));