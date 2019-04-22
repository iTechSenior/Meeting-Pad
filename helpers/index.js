const fs = require('fs');
const crypto = require('crypto');
const { algorithm, password } = require('../config').crypto;
const appRoot = require('app-root-path');

module.exports = {
    aW: (fn) => (req, res, next) => Promise.resolve(fn(req, res, next).catch(next)),
    response: (bool, message, info) => {
        if (bool) {
            return { succes: { message, info } }
        } else {
            return { error: { message, info } }
        }
    },
    checkDirectorySync: (directory) => {
        try {
            fs.statSync(directory);
        } catch (e) {
            fs.mkdirSync(directory);
        }
    },
    encryptFile: async (file) => {
        let readable = fs.createReadStream(appRoot + '/tmp/' + file);
        var encrypt = crypto.createCipher(algorithm, password);
        var writeable = fs.createWriteStream(appRoot + '/uploads/' + file);
        return readable.pipe(encrypt).pipe(writeable);
    },
    decryptFile: async (file) => {
        let readable = fs.createReadStream(appRoot + '/uploads/' + file);
        let decrypt = crypto.createDecipher(algorithm, password);
        let writeable = fs.createWriteStream(appRoot + '/client/build/' + file);
        await readable.pipe(decrypt).pipe(writeable);
    },
    isInArrayM: (arr, id) => arr.some(e => e.equals(id)),
    dates: {
        january: {
            startDay: new Date(new Date().getFullYear(), 0, 1),
            lastDay: new Date(new Date().getFullYear(), 1, 0, 23, 59, 59, 23, 59, 59)
        },
        february: {
            startDay: new Date(new Date().getFullYear(), 1, 1),
            lastDay: new Date(new Date().getFullYear(), 2, 0, 23, 59, 59)
        },
        march: {
            startDay: new Date(new Date().getFullYear(), 2, 1),
            lastDay: new Date(new Date().getFullYear(), 3, 0, 23, 59, 59)
        },
        april: {
            startDay: new Date(new Date().getFullYear(), 3, 1),
            lastDay: new Date(new Date().getFullYear(), 4, 0, 23, 59, 59)
        },
        may: {
            startDay: new Date(new Date().getFullYear(), 4, 1),
            lastDay: new Date(new Date().getFullYear(), 5, 0, 23, 59, 59)
        },
        june: {
            startDay: new Date(new Date().getFullYear(), 5, 1),
            lastDay: new Date(new Date().getFullYear(), 6, 0, 23, 59, 59)
        },
        july: {
            startDay: new Date(new Date().getFullYear(), 6, 1),
            lastDay: new Date(new Date().getFullYear(), 7, 0, 23, 59, 59)
        },
        august: {
            startDay: new Date(new Date().getFullYear(), 7, 1),
            lastDay: new Date(new Date().getFullYear(), 8, 0, 23, 59, 59)
        },
        september: {
            startDay: new Date(new Date().getFullYear(), 8, 1),
            lastDay: new Date(new Date().getFullYear(), 9, 0, 23, 59, 59)
        },
        october: {
            startDay: new Date(new Date().getFullYear(), 9, 1),
            lastDay: new Date(new Date().getFullYear(), 10, 0, 23, 59, 59)
        },
        november: {
            startDay: new Date(new Date().getFullYear(), 10, 1),
            lastDay: new Date(new Date().getFullYear(), 11, 0, 23, 59, 59)
        },
        december: {
            startDay: new Date(new Date().getFullYear(), 11, 1),
            lastDay: new Date(new Date().getFullYear(), 11, 31, 23, 59, 59)
        }
    }
}