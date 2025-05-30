const express = require("express");
const app = express();
const { startJob } = require("./jobManager");
const jobStore = require("./jobStore");
const { analyzeStats } = require("./stats");

app.use(express.json());

app.post("/jobs", (req, res) => {
    const { jobName, arguments: args } = req.body;
    if (!jobName) return res.status(400).send({ error: "jobName required" });
    const jobId = startJob(jobName, args || []);
    res.send({ jobId });
});

app.get("/jobs", (req, res) => {
    res.send(jobStore.getAllJobs());
});

app.get("/stats", (req, res) => {
    res.send(analyzeStats());
});

app.listen(3000, () => console.log("Server started on port 3000"));
