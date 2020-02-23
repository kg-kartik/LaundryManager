const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

require('./config/passport')(passport);
const db = require('./config/keys').MongoURI;

mongoose.connect(db, {useNewUrlParser : true,
    useUnifiedTopology: true})
.then(() => console.log('Database connected'))
.catch((err) => {
    console.log(err);
})
const PORT = process.env.PORT || 5000;

//for url encoding
app.use(express.urlencoded({
    extended : false
}));

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  //Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());  
  app.use(flash());

  //Global variables for flash messages 
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
app.use(expressLayouts);
app.set('view engine','ejs');


app.use('/',require('./routes/index.js'));
app.use('/users',require('./routes/users.js'));
// app.use('/admin',require('/routes/admin.js'))

app.listen(PORT, console.log(`Server started on ${PORT}`));

