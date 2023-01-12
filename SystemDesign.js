
/* 1. System Design */

        //coding by ChatGPT
class URLShortener {
    constructor() {
        this.shortToLongURLMap = {};
        this.longToShortURLMap = {};
        this.baseURL = "http://shorturl.com/";
        this.counter = 100000;
    }

    shortenURL(longURL) {
        if (longURL in this.longToShortURLMap) {
            return this.longToShortURLMap[longURL];
        } else {
            this.counter += 1;
            let shortURL = this.baseURL + this.getUniqueString(longURL);
            this.longToShortURLMap[longURL] = shortURL;
            this.shortToLongURLMap[shortURL] = longURL;
            return shortURL;
        }
    }

    getUniqueString(longURL) {
        let hash = 0,
            i,
            chr;
        if (longURL.length === 0) return hash;
        for (i = 0; i < longURL.length; i++) {
            chr = longURL.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    expandURL(shortURL) {
        if (shortURL in this.shortToLongURLMap) {
            return this.shortToLongURLMap[shortURL];
        } else {
            return null;
        }
    }
}

let urlShortener = new URLShortener();
let shortURL = urlShortener.shortenURL("http://my-order.ai/long-url/very-sub-path");
console.log(shortURL);
let expandedURL = urlShortener.expandURL(shortURL);
console.log(expandedURL);

//database ใช้ mongoDB อ่านได้เร็วกว่าเก็บเป็น JSON,ต้นทุนค่าใช้จ่ายน้อยกว่า,ขยายฐานข้อมูลได้ง่าย
// back-end  ใช้ Node.js หลักๆก็ใช้ npm  run serve ,built Project 
// front-end  ใช้ vanillaJS เพราะมีความถนัดที่สุด ณ ตอนนี้
// deployment  ใช้  node.js deploy ใน cyclick เพราะมันฟรี 3apps 100k request
