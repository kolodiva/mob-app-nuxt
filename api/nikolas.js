const db = require('../db')

async function getNomenklatorY() {

  const { rows } = await db.queryStat1( 'getNomenklatorY' )

  //console.log( rows[0].res[0] )

  return rows[0].res ? rows[0].res : [];
}

export { getNomenklatorY };
