const db = require('../db')

async function getNomenklatorY() {

  const { rows } = await db.queryStat1( 'getNomenklatorY' )

  return rows;
}

export { getNomenklatorY };
