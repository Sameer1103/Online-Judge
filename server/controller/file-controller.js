// // const fs = require('fs');
// // const path = require('path');
// // const { v4: uuid } = require('uuid');
// import fs from 'fs';
// import path from 'path';
// import { v4 as uuid } from 'uuid';

// const dirCodes = path.join(__dirname, 'codes');

// if (!fs.existsSync(dirCodes)) {
//     fs.mkdirSync(dirCodes, { recursive: true });
// }

// const generateFile = async (language, code) => {
//     const jobId = uuid();
//     const fileName = `${jobId}.${language}`;
//     const filePath = path.join(dirCodes, fileName);
//     await fs.writeFileSync(filePath, code);
//     return filePath;
// };

// // module.exports = { generateFile, };
// export default generateFile;


import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

const currentFileUrl = import.meta.url;
const currentDir = path.dirname(new URL(currentFileUrl).pathname);
const dirCodes = path.join(currentDir, 'codes');


const generateFile = async (language, code) => {
    const jobId = uuid();
    const fileName = `${jobId}.${language}`;
    const filePath = path.join(dirCodes, fileName);
    await fs.writeFileSync(filePath, code);
    return filePath;
};

export default generateFile;
