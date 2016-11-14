
const express = require('express');
const morgan = require('morgan');

const errorHandler = require('./errorHandler');

const threads = require('./routes/threads');
const remarks = require('./routes/remarks');
const users = require('./routes/users');
// const roles = require('./routes/roles');
const auths = require('./routes/auths');

const app = express();

const ensureAuth = require('./auth/ensureAuth')();
const ensureRole = require('./auth/ensureRoles');

app.use(morgan('dev')); // use for logging

app.use('/api/auth', auths); // sign-up and sign-in are here

// the USERS and ROLES routes are only available to admin and moderator roles.
app.use('/api/users', ensureAuth, ensureRole('admin'), users);

// app.use('/api/threads', ensureAuth, threads);
app.use('/api/comments', ensureAuth, remarks);

app.use(errorHandler);

module.exports = app;
