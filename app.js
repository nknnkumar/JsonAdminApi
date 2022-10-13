const express = require('express');
var path = require('path');
let cors = require("cors");

const app = express();
var path = require('path');
var cookieParser = require('cookie-parser');

var port = normalizePort(process.env.PORT || '4116');

let SubRouteJSONProject = require("./Projects/JSONProject/Routes");

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '100mb' }));

app.get('/', function (req, res, next) {
    //res.sendFile(path.join(__dirname + `/Html/JSONProject.html`));
    res.status(301).redirect(`/JSONProject/Html/Admin/Dashboard.html`);
    //res.sendFile(path.join(__dirname + `/public/JSONProject/Html/Admin/Dashboard.html`));
});

app.use("/JSONProject", cors({ origin: '*' }), SubRouteJSONProject);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

app.listen(port, () => {
    console.log(`Listening in port : ${port}`);
    console.log(`Click to open : http://localhost:${port}`);
});
