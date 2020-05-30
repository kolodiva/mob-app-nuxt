const db = require('../db')

async function getSubNomenklator( { parentguid, userid, connectionid } ) {

  //Ищем номер Заказа без создания если его нет НЕ создаем новый
  const { orderid }  = await db.getConnectionOrder( userid, connectionid, false );

  const { rows } = await db.queryApp('getSubNomenklator', { parentguid, orderid })

  return rows;
}

async function getGoodCard( { synonym, userid, connectionid } ) {

  const { orderid }  = await db.getConnectionOrder( userid, connectionid, false );

  const { rows } = await db.queryApp('getGoodCard', { synonym, orderid } )

  const rowsPhotos250 = await db.queryApp('getPhotos250', { synonym } )

  return { rows: rows, rowphoto: rowsPhotos250.rows };
}

export { getSubNomenklator, getGoodCard };
