const db = require('../db')

async function getSubNomenklator({ id, parentguid }) {

  const { rows } = await db.queryApp('getSubNomenklator', {parentguid, id})

  return rows;
}

export { getSubNomenklator };
