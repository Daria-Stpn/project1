const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
const multer = require("multer")
const path = require("path");

app.use(express.static("static"));
app.use(express.json());
let products = [];

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    res.render("index", { products: products })
});

app.get("/post/:id", (req, res) => {
    const postId = req.params.id;
    if (!products[postId]) {
        return res.status(404).render("notfound");
    }
    res.render("post", { product: products[postId] });
});

app.post("/add", upload.fields([{ name: "image" }]),(req, res) => {
    let data = req.body;
    data.image = req.files.image.map((file) => file.filename);
    data.id = products.length;
    products.push(data);
    res.status(201);
    res.end();
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
