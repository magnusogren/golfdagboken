if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const ExpressError = require('./utils/ExpressError');
const MongoStore = require('connect-mongo');

const Anvandare = require('./models/anvandare');

const golfbanorRoutes = require('./routes/golfbanor');
const golfdagbokRoutes = require('./routes/golfdagbok');
const omdomenRoutes = require('./routes/omdomen');
const anvandareRoutes = require('./routes/anvandare');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/golfdagboken';
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// const secret = process.env.SECRET || 'hemlighet';

// const store = MongoStore.create({
//   mongoUrl: dbUrl,
//   touchAfter: 24 * 60 * 60,
//   secret,
// });

// store.on('error', function (e) {
//   console.log('SESSION STORE ERROR', e);
// });

// const sessionConfig = {
//   store,
//   name: '_sess',
//   secret,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     httpOnly: true,
//     // secure: true,
//     expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//     maxAge: 1000 * 60 * 60 * 24 * 7,
//   },
// };

const sessionConfig = {
	secret: 'thisshouldbeabettersecret!',
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Anvandare.authenticate()));

passport.serializeUser(Anvandare.serializeUser());
passport.deserializeUser(Anvandare.deserializeUser());

app.use((req, res, next) => {
	// console.log(req.query);
	// if (!['/login', '/'].includes(req.originalUrl)) {
	//   req.session.returnTo = req.originalUrl;
	// }
	res.locals.currentUser = req.user;
	// res.locals.success = req.flash('success');
	// res.locals.error = req.flash('error');
	next();
});

app.use('/golfbanor', golfbanorRoutes);
app.use('/golfdagbok', golfdagbokRoutes);
app.use('/golfbanor/:id/omdome', omdomenRoutes);
app.use('/', anvandareRoutes);

app.get('/', (req, res) => {
	res.render('start');
});

app.all('*', (req, res, next) => {
	next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = 'Oh no, Something Went Wrong';
	res.status(statusCode).render('error', { err });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`LISTENING ON PORT ${port}`);
});
