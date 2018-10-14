#!/usr/bin/env node
var read = require('node-readability');
var sanitizer = require('sanitizer');
var PDFDocument = require('pdfkit');
var program = require('commander');
var sanitizeHtml = require('sanitize-html');
var fs = require("fs");
var urlvalue = "";

program
    .option('--url, [url]', 'The url')
    .parse(process.argv);

if (program.url) urlvalue = program.url;
else process.exit(console.log("Please add --url parameter. Something like this: $ pdfsave --url http:www.example.com"));




read(urlvalue, function(err, article, title, meta) {

    var doc = new PDFDocument({
        margin: 50
    });

    var result = stripHTML(article.content);
    var title1 = article.title;

    doc.pipe(fs.createWriteStream(title1 + '.pdf'));
    fs.createWriteStream(title1 + '.pdf', 'UTF-8');

    var result = stripHTML(article.content);
    var title1 = article.title;


    doc.font('Helvetica', 21);
    doc.text(title1, {
        paragraphGap: 12
    });

    doc.font('Times-Roman', 13);
    doc.fillColor('#222222');
    doc.text(result, {
        width: 520,
        paragraphGap: 10,
        indent: 0,
        align: 'left',
        lineGap: 1.6,
        ellipsis: true,
        continued: true
    });

    doc.end();



});

function stripHTML(html) {

    var clean = sanitizeHtml(html, {
        allowedTags: ['p', 'div']
    });

    clean = clean.replace(/<(?:.|\n)*?>/gm, "\n");
    clean = clean.replace(/(?:(?:\r\n|\r|\n)\s*){2}/ig, "\n");
    return clean.trim();
}
