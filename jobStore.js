const jobs = new Map();

function addJob(job) {
    jobs.set(job.id, job);
}

function getAllJobs() {
    return Array.from(jobs.values());
}

function getJobStats() {
    return Array.from(jobs.values());
}

module.exports = { addJob, getAllJobs, getJobStats };

