const { spawn } = require("child_process");
const path = require("path");
const jobStore = require("./jobStore");

const isWindows = process.platform === "win32";
const jobScript = isWindows ? "dummy_job.bat" : "./dummy_job.sh";

function startJob(jobName, args) {
    const jobId = Date.now() + "-" + Math.random().toString(36).substr(2, 5);
    const job = {
        id: jobId,
        name: jobName,
        args,
        status: "running",
        startedAt: new Date(),
        retries: 0
    };

    jobStore.addJob(job);

    const run = () => {
        const child = spawn(jobScript, args, {
            shell: true
        });

        child.on("exit", (code) => {
            if (code === 0) {
                job.status = "completed";
            } else {
                if (job.retries === 0) {
                    job.status = "retried";
                    job.retries++;
                    run();
                } else {
                    job.status = "retry-failed";
                }
            }
            job.endedAt = new Date();
        });

        child.on("error", (err) => {
            job.status = "crashed";
            job.error = err.message;
        });
    };

    run();

    return jobId;
}

module.exports = { startJob };
