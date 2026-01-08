const crypto = require('crypto');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const PATH = 'C:/Users/nulla/Downloads/shua/temp';
const KEY_PATH = 'C:/Users/nulla/Documents/Archive/key.php';
const KEY = readFileSync(KEY_PATH);
const IV = Buffer.alloc(16, 0);
// const aesKey = crypto.enc.Utf8.parse(KEY);
const start = 2451
const end = 3648

const main = () => {
  for (let index = start; index <= end; index++) {
    try {
      decodeFile(`media-ut8lgth6s_${index.toString()}`);
    } catch (error) {
      console.error(error);
    }
  }
};
// const decodeFile = (name) => {
//   const data = readFileSync(join(PATH, name));
//   const wordArray = crypto.lib.WordArray.create(data);
//   const decryptedData = crypto.AES.decrypt(wordArray, aesKey);
//   writeFileSync(join(PATH, '../test/t.ts'), decryptedData.toString(crypto.enc.Utf8), 'utf8');
// };
const decodeFile = (name) => {
  const data = readFileSync(join(PATH, name + '.ts'));
  const decipher = crypto.createDecipheriv('aes-128-cbc', KEY, IV);
  let decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  writeFileSync(`C:/Users/nulla/Desktop/temp/ts/${name}_decrypted.ts`, decrypted);
};
main();
