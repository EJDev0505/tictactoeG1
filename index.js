const path = require('path');
const express = require("express");



const app = express();
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './function')));
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './staticTemplate/index.html'));
});

app.get("/twoPlayer", (req, res) => {
    res.sendFile(path.join(__dirname, './staticTemplate/2player.html'));
})
app.get("/threePlayer", (req, res) => {
    res.sendFile(path.join(__dirname, './staticTemplate/3player.html'));
})
app.get("/fourPlayer", (req, res) => {
    res.sendFile(path.join(__dirname, './staticTemplate/4player.html'));
})


app.listen(PORT, () => {
    console.log(`Running ${PORT}`)
})