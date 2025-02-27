"use strict";
const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const app = express();
const port = 8000;
app.use(cors({
    origin: '*'
}));
app.use(parser.json());
app.listen(port, () => {
    console.log('server running on port ' + port + ' ******');
});
