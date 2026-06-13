const crypto = require('crypto');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const PATH = 'C:/Users/nulla/Downloads/shua/shua_download_1779613244591';
const KEY_PATH = 'C:/Users/nulla/Documents/Archive/6394955091112';
const KEY = readFileSync(KEY_PATH);
const IVstr = '7a9c75eaf86b79eae35302818661c073';
const IV = Buffer.from(IVstr, 'hex');
// const aesKey = crypto.enc.Utf8.parse(KEY);
const start = 296601264;
const end = 296601932;

const main = () => {
  for (let index = start; index <= end; index++) {
    try {
      decodeFile(`media_hls1080p_${index.toString()}`);
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
  writeFileSync(`C:/Users/nulla/Desktop/temp/ts3/${name}_decrypted.ts`, decrypted);
};
main();
