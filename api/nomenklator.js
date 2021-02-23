const db = require('../db')

async function getSubNomenklator( { parentguid, userid, connectionid } ) {

  //Ищем номер Заказа без создания если его нет НЕ создаем новый
  const { orderid }  = await db.getConnectionOrder( userid, connectionid, false );

  const { rows } = await db.queryApp('getSubNomenklator', { parentguid, orderid })

  const breadcrumb = await db.queryApp('getBreadCrumbs', { parentguid  })

  //console.log(breadcrumb.rows)

  return {rows, breadcrumb: breadcrumb.rows};
}

async function getSearchNomenklator( { searchtext } ) {

  //Ищем номер Заказа без создания если его нет НЕ создаем новый
  const {rows} = await db.queryApp('getSearchNomenklator', { searchtext  })

  return {rows};
}

async function getGoodCard( { synonym, userid, connectionid } ) {

  const { orderid }  = await db.getConnectionOrder( userid, connectionid, false );

  const { rows } = await db.queryApp('getGoodCard', { synonym, orderid } )

  if (rows.length === 0) {
    return {status: 404, msg: "Товар с таким Кодом НЕ найден."};
  }

  const rowsPhotos250 = await db.queryApp('getPhotos250', { synonym } )

  const parentguid = rows[0].parentguid

  const breadcrumb = await db.queryApp('getBreadCrumbs', { parentguid  })

  return { rows: rows, rowsphoto: rowsPhotos250.rows, breadcrumb: breadcrumb.rows  };
}

export { getSubNomenklator, getGoodCard, getSearchNomenklator };
