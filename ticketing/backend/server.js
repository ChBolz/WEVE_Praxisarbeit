const express = require("express");
const cors = require("cors");
const ticketRoutes = require("./routes/tickets");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tickets", ticketRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
