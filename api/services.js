const db = require('../db')

async function getQRPrint({id, pack}) {

  const {rows} = await db.queryApp('getQRPrint', {id, pack})

  //console.log(breadcrumb.rows)

  return rows;
}

export { getQRPrint };
