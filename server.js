const app = require("./app");
const PORT = process.env.PORT || 3000;// Change this line in your frontend code

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Frontend UI server running at http://localhost:${PORT}`);
});
