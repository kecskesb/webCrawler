
const { argv } = require('node:process');
const { crawlPage } = require('./crawl');
const { printReport } = require('./report');

async function main() {
    if (argv.length < 3) {
        console.error('Error: Argument missing.');
        process.exit(1);
    }
    if (argv.length > 3) {
        console.error('Error: Too many arguments.');
        process.exit(1);
    }

    console.log(`Starting crawling at ${argv[2]}.`);
    const pages = await crawlPage(argv[2], argv[2], {});
    printReport(pages);
}

main().then(() => console.log("Done."));
