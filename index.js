const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("static"));
app.use(express.json());
let products = [];

app.get("/", (req, res) => {
    res.render("index", { products: products })
});

app.post("/add", (req, res) => {
    let data = req.body;
    products.push(data);
    res.status(200);
    res.redirect("/");
});

app.post("/ads", (req, res) => {
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.json(products).end();
});

app.use((req, res, next) => {
    res.status(404);
    res.render("notFound");
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
