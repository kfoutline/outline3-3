const path = require('path');

const mimeTypes = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "txt":"text/plain"
};

const lookup = pathname => {
    let ext = path.extname(pathname).slice(1);
    return mimeTypes[ext] || mimeTypes['txt'];
}

module.exports = lookup;