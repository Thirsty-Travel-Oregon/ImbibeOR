const express = require('express');
const morgan = require('morgan');
const path = require('path');
const errorHandler = require('./errorHandler');
const ensureAuth = require('./auth/ensureAuth')();
const ensureRole = require('./auth/ensureRoles');

const auths = require('./routes/auths');
const users = require('./routes/users');
const threads = require('./routes/threads');
const remarks = require('./routes/remarks');
const drinkTypes = require('./routes/drinkTypes');
const regions = require('./routes/regions');


const publicDir = path.join(__dirname, '../public');

const app = express();

//home routes
app.use(express.static(publicDir));

app.use(morgan('dev')); // use for logging

app.use('/api/auth', auths); // sign-up and sign-in are here

// the USERS and ROLES routes are only available to admin and moderator roles.
app.use('/api/users', ensureAuth, ensureRole(['admin']), users);
app.use('/api/threads', threads);
app.use('/api/remarks', remarks);
app.use('/api/regions', regions);
app.use('/api/drinkTypes', drinkTypes);

// the USERS and ROLES routes are only available to admin and moderator roles.
app.use('/api/users', ensureAuth, ensureRole(['admin']), users);

app.use(errorHandler);

module.exports = app;
