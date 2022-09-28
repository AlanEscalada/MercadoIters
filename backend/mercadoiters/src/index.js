const express = require('express');
const publicationsRouter = require('./routes/publication');
const authRouter = require('./routes/auth');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const fileUploader = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(session({
    secret:'asd15523ads',
    name: 'mercadoiters',
    saveUninitialized: true,
    resave: false,
    store: new FileStore(),
}));
app.use(fileUploader());
app.use(express.static('./public'));
app.use('/publicaciones', publicationsRouter);
app.use('/auth', authRouter);


app.listen(8000);