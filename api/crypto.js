//import * as CryptoJS from 'crypto-js';
import SHA256 from 'crypto-js/sha256';
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
const bcrypt = require('bcrypt');

module.exports = {
  matchPass: (key, pass, hash) => {

    const _key = SHA256(key + '118540800').toString()

    const bytes = AES.decrypt(pass, _key)

    const originalText = SHA256(SHA256(bytes.toString(encUtf8)).toString()).toString()

    return bcrypt.compareSync(originalText, hash);
  },

  genPass: (pass) => {

    //const originalText = CryptoJS.SHA256(CryptoJS.SHA256(bytes.toString(CryptoJS.enc.Utf8)).toString()).toString()
    const originalText = SHA256(pass).toString()
    //const originalText = CryptoJS.SHA256(CryptoJS.SHA256('Pp1234567').toString()).toString()
    return bcrypt.hashSync(originalText, 10);
  }
}
