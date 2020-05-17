const db = require('../db')

async function getCart({ id }) {
  //const { rows } = await db.queryApp('getCart', [])
  return [5];
}

async function chngeCart({ userid, guid, qty, connectionid }, res) {

  // console.log( userid, guid, qty, connectionid )

  const {connid, orderid, remember_token}  = await db.getConnectionOrder( userid, connectionid );

  // console.log( connid, orderid, remember_token ) 

  if (remember_token && remember_token != connectionid) {
      res.cookie('connectionid', remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
  }

  return [];
}

export { chngeCart, getCart };
