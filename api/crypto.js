import * as CryptoJS from 'crypto-js';
const bcrypt = require('bcrypt');

module.exports = {
  matchPass: (key, pass, hash) => {

    const _key = CryptoJS.SHA256(key + '118540800').toString()

    const bytes = CryptoJS.AES.decrypt(pass, _key)

    const originalText = CryptoJS.SHA256(CryptoJS.SHA256(bytes.toString(CryptoJS.enc.Utf8)).toString()).toString()

    return bcrypt.compareSync(originalText, hash);
  }
}
