require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
redirect_uri = 'http://localhost:5173/auth/google/callback'
const secret_key = process.env.secret_key

const express = require('express');
const session = require('express-session');
const {OAuth2Client} = require('google-auth-library');

const app = express();

app.use(session({
  secret: '8473294ydjfvjn4486u3n',
  resave: true,
  saveUninitialized: true
}));

const oauth2Client = new OAuth2Client(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uri
);

app.get('/auth/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
  });
  res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
  const {tokens} = await oauth2Client.getToken(req.query.code);
  oauth2Client.setCredentials(tokens);
  req.session.tokens = tokens; // Save tokens to the session
  res.redirect('/protected-page');
});

const checkAuthentication = (req, res, next) => {
  if (!req.session.tokens) {
    return res.status(401).send('You need to login first');
  }
  next();
};

app.get('/protected-page', checkAuthentication, (req, res) => {
  // Use the OAuth2 client to fetch data from Google API.
  res.send('You have accessed a protected page');
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

