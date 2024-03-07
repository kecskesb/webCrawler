
const { test, expect} = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl');

test('http plus slash at end', () => {
    expect(normalizeURL('http://testserver.com/page/')).toBe('testserver.com/page');
});

test('https plus slash at end', () => {
    expect(normalizeURL('https://testserver.com/page/')).toBe('testserver.com/page');
});

test('http without slash at end', () => {
    expect(normalizeURL('http://testserver.com/page')).toBe('testserver.com/page');
});

test('https without slash at end', () => {
    expect(normalizeURL('https://testserver.com/page')).toBe('testserver.com/page');
});

test('wrong url', () => {
    expect(normalizeURL('this is not a url')).toBe('');
});

test('getURLsFromHTML 1', () => {
    expect(getURLsFromHTML('<html>\n' +
        '    <body>\n' +
        '        <a href="index.html"><span>Go to Boot.dev</span></a>\n' +
        '    </body>\n' +
        '</html>\n', 'https://blog.boot.dev')[0]).toBe('https://blog.boot.dev/index.html')
});

test('getURLsFromHTML with bogus base URL', () => {
    expect(() => {
        getURLsFromHTML('<html>\n' +
            '    <body>\n' +
            '        <a href="index.html"><span>Go to Boot.dev</span></a>\n' +
            '    </body>\n' +
            '</html>\n', 'this is not valid')
    }).toThrow('Invalid URL');
})
