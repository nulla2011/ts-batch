import { readdirSync, rename } from 'fs';

const list = readdirSync('./');
for (const file of list) {
  const match3 = file.match(/(?<=media-\w{9}_)\d{3}_decrypted\.ts$/);
  const match2 = file.match(/(?<=media-\w{9}_)\d{2}_decrypted\.ts$/);
  const match1 = file.match(/(?<=media-\w{9}_)\d{1}_decrypted\.ts$/);
  let newFile;
  if (match1) {
    newFile = file.slice(0, -14) + '000' + match1[0];
  } else if (match2) {
    newFile = file.slice(0, -15) + '00' + match2[0];
  } else if (match3) {
    newFile = file.slice(0, -16) + '0' + match3[0];
  } else {
    continue;
  }
  rename(file, newFile, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(newFile);
    }
  });
}
