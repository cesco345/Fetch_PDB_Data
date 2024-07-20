const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/protein/:id", (req, res) => {
  const proteinData = {
    id: req.params.id,
    name: "Ubiquitin",
    molecularWeight: "8.5 kDa",
    structure: "3D structure data",
    score: "100",
  };
  res.json(proteinData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
