const express = require('express');
const port = 3008;

const app = express();

app.get('', async(req, res) => {
    const host = req.headers.host;
    if (host.includes('gerardoarceo')) {
        res.redirect('/cobertura/index.html');
    } else {
        res.redirect('/index.html');
    }
});

app.use(express.static(__dirname + '/../public'));

app.listen(port, console.log(`SERVER LISTENING PORT: ${ port}`));