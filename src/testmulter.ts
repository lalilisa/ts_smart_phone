import express = require('express');
import multer = require('multer');
import { Multer } from 'multer';
import assert = require('assert');

export const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        cb(null, false);
        cb(null, true);
        cb(new Error(`I don't have a clue!`));
    },
});

upload; // $ExpectType Multer
assert.strictEqual(upload.constructor.name, 'Multer');

const app = express();

app.post('/profile', upload.single('avatar'), (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.file; // $ExpectType File | undefined
});

