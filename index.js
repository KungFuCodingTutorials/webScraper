// Dependencies
const https = require('https');
const stringDecoder = require('string_decoder').StringDecoder;

// BufferString
const bufferString = function(url,callback){
    https.get(url,function(req){
        let buffer = '';
        let decoder = new stringDecoder();
        req.on('data',function(data){
            buffer += decoder.write(data);
        })
        req.on('end',function(){
            buffer += decoder.end();
            callback(buffer);
        })
    })
}

// Count keyword function
const countKeyword = function(url,keyword){
    const word = keyword;
    bufferString(url,function(buffer){
        const counter = countOccurences(buffer,word);
        function countOccurences(string,word){
            return string.split(word).length - 1;
        }
        console.log(`The web page contain ${counter} times "${word}"`);
    })
}

// Get all links from a website
const allLinks = function(url){
    bufferString(url,function(buffer){
        let str = buffer;
        let pattern = /<a[^>]*href=["']([^"']*)["']/g;
        while(match=pattern.exec(str)){
            console.log(match[1]);
        }
    })
}

countKeyword('https://www.wsj.com/','war');
allLinks('https://www.wsj.com/');