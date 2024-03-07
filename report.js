
function printReport(pages) {
    console.log("\nStarting report:");
    const sortedPages = sortPages(pages);
    for (const i of sortedPages) {
        console.log(`Found ${i.num} internal links to ${i.url}`);
    }
}

function sortPages(pages) {
    let sorted = [];
    for (const [url, num] of Object.entries(pages)) {
        sorted.push({url, num});
    }
    sorted.sort((a, b) => b.num - a.num);
    return sorted;
}

module.exports = {
    printReport
}