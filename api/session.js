const db = require('../db')
const {matchPass, genPass, genUuid} = require('./crypto')

async function index( params, res ) {

  res.clearCookie("_keyUser");

  const {keyUser} = params

  if (!keyUser) {
    return {status: 403, msg: "Your request is very very ..."};
  }

  const { rows } = await db.queryApp('getUserByEmail', params)

  if (rows.length === 0) {
    return {status: 404, msg: "Пользователь с таким адресом НЕ найден - на регистрацию."};
  }

  const match = matchPass(keyUser, params.password, rows[0].password_digest)

  if (!match) {
    return {status: 401, msg: "Введен неверный пароль, покрутите еще."}
  }

  return {token: rows[0].password_digest};
}

async function userNew(params) {

  params.password_digest = genPass(params.password)

  await db.queryApp('addNewUser', params)

  return [];
}

async function userAuth(params) {

  let user = {id:1, username: 'Anonimus', name: 'Anonimus'}

  const {rows} = await db.queryApp('userAuth', params)

  if (rows.length > 0) {

    const rec = rows[0];

    user.id       = rec.id
    user.username = rec.email
    user.name     = rec.email
  }

  return { user: user };
}

export { index, userNew, userAuth };
