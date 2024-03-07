const { JSDOM } = require('jsdom')

function normalizeURL(url) {
    let myUrl;
    try {
        myUrl = new URL(url);
    } catch (e) {
        console.error(`Error: ${e}`);
        return "";
    }
    let result = `${myUrl.hostname}${myUrl.pathname}`;
    if (result.endsWith('/')) {
        result = result.slice(0, -1);
    }
    return result;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody, {url: baseURL});
    const fullLinks = dom.window.document.querySelectorAll('a');
    for (const e of fullLinks) {
        urls.push(e.href);
    }
    return urls;
}

async function crawlPage(baseUrl, currentUrl, pages) {
    if (new URL(baseUrl).hostname !== new URL(currentUrl).hostname) {
        return pages;
    }
    const normUrl = normalizeURL(currentUrl);
    if (pages[normUrl]) {
        pages[normUrl] = pages[normUrl] + 1;
        return pages;
    }
    pages[normUrl] = 1;
    try {
        const response = await fetch(currentUrl);
        if (response.status >= 400 && response.status < 500) {
            throw Error("URL could not be retrieved.");
        }
        if (!response.headers.get("Content-Type").startsWith("text/html")) {
            throw Error("Wrong URL.");
        }
        console.log(`Crawling ${currentUrl}`);
        const urlList = getURLsFromHTML(await response.text(), baseUrl);
        for (const url of urlList) {
            pages = await crawlPage(baseUrl, url, pages);
        }
    } catch (e) {
        console.error(`Error: ${e}`);
    }
    return pages;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}
