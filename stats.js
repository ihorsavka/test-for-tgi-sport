const jobStore = require("./jobStore");

function analyzeStats() {
    const jobs = jobStore.getJobStats();
    const total = jobs.length;
    if (total === 0) {
        return {
            totalJobs: 0,
            overallSuccessRate: 0,
            patterns: []
        };
    }

    const successful = jobs.filter(j => j.status === "completed").length;
    const overallSuccessRate = successful / total;

    function calculatePattern(patternFn, description) {
        const matched = jobs.filter(patternFn);
        const successCount = matched.filter(j => j.status === "completed").length;
        const successRate = matched.length > 0 ? successCount / matched.length : 0;

        return {
            pattern: description,
            matchCount: matched.length,
            successRate: +successRate.toFixed(2),
            differenceFromAverage: ((successRate - overallSuccessRate) * 100).toFixed(1) + "%"
        };
    }

    const patterns = [
        calculatePattern(j => /^[aeiou]/i.test(j.name), "Job name starts with a vowel"),
        calculatePattern(j => j.name.includes("-"), "Job name includes '-'"),
        calculatePattern(j => {
            if (!j.args || j.args.length === 0) return false;
            const avgLen = j.args.reduce((sum, arg) => sum + arg.length, 0) / j.args.length;
            return avgLen > 5;
        }, "Average argument length > 5")
    ];

    return {
        totalJobs: total,
        overallSuccessRate: +overallSuccessRate.toFixed(2),
        patterns
    };
}

module.exports = { analyzeStats };
