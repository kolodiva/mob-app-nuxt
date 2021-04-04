
const { Pool } = require('pg')
const queries = require('./queries')

// let conn_param  = null;
// let conn_param_statistica = null;
let connParam1   = null;
let connParam2   = null;

if (process.env.NODE_ENV == 'production') {
  //размещение DO
  // connParam1 = 'postgresql://postgres:123@localhost:5432/app1'
  // connParam2 = 'postgresql://postgres:123@localhost:5432/statistica'

  //Не забудь зольДат поменять при размещении на RF
  // conn_param = {'host':'172.17.0.3', 'password':'c2ec57df699966b3afef779a16fa5fff', 'port':'5432'};
  // conn_param_statistica = {'host':'172.17.0.2', 'password':'27ac4a1dd6873624b7535fe5660740d6', 'port':'5432'};

  connParam1 = 'postgresql://postgres:c2ec57df699966b3afef779a16fa5fff@172.17.0.3:5432/app1'
  connParam2 = 'postgresql://postgres:27ac4a1dd6873624b7535fe5660740d6@172.17.0.2:5432/statistica'
} else {
  // connParam1 = 'postgresql://postgres:123456@localhost:5433/app1'
  // connParam2 = 'postgresql://postgres:123456@localhost:5433/statistica'

  connParam1 = 'postgresql://postgres:123456@localhost:5432/app1'
  connParam2 = 'postgresql://postgres:123456@localhost:5432/statistica'

}

const dbpgApp1 = new Pool({
  connectionString: connParam1,
})

dbpgApp1.connect( err => {
  if (err) {
  console.log(err.stack)
  }
})

const dbpgStat = new Pool({
  connectionString: connParam2,
})

async function getConnectionOrder( userid, connectionid, createnewconn = true  ) {

  const strWhere = userid === 1 ? `where t1.user_id = ${userid} and t1.remember_token = '${connectionid}'` : `where t1.user_id = ${userid}`

  let {rows} = await dbpgApp1.query( queries['getConnOrder'](strWhere) )

  if ( rows.length === 0 && !createnewconn ) {
    return {connid: undefined, orderid: undefined, remember_token: undefined}
  }

  if ( rows.length === 0 ) {

    const newconn = await dbpgApp1.query( queries['addNewConnOrder'](userid) )

    rows = newconn.rows
  }

  return rows[0]
}

async function chngOrder( orderid, guid, qty, price, unit_type_id ) {

  const res = await dbpgApp1.query( queries['chngOrder'](  orderid, guid, qty, price, unit_type_id ) )
  const res2 = await dbpgApp1.query( queries['chngSumOrder'](  orderid ) )

  return ( res[1].rowCount === 1 )
}

async function procOrder( orderid, mister, filial,  email, phone, info ) {
  const res = await dbpgApp1.query( queries['procOrder']( orderid, mister, filial, email, phone, info ) )
}

async function unitOrders( { userid }, connectionid ) {

  //ищем сущ connection по анониму если он есть НЕ создавая нового
  const orderid2 = await getConnectionOrder( 1, connectionid, false );
  //ищем сущ connection по Авторизованномй пользователю если он есть НЕ создавая нового
  const { connid, orderid} = await getConnectionOrder( userid, connectionid, false );

  //console.log( userid, orderid, orderid2.orderid, connid, connectionid )

  //объединяем ТОЛЬКО если существую заказы и по анониму и по авторизованному пользователю
  if ( orderid && orderid2.orderid ) {
    try {

      await dbpgApp1.query( 'begin;' );

      //Добавили новые Conn Order
      const newconnorder = await dbpgApp1.query( queries['addNewConnOrder'](userid) )

      const newrec = newconnorder.rows[0]

      await dbpgApp1.query( queries['unitOrders']({ orderid1: orderid, orderid2: orderid2.orderid, orderidnew: newrec.orderid }) )

      await dbpgApp1.query( queries['chngSumOrder'](  newrec.orderid ) )

      await dbpgApp1.query( 'commit;' );

      return true;

    } catch (e) {

      await dbpgApp1.query( 'rollback;' );

      throw e;
    }
  }

  //если существует сщтт  только по анониму - заменяем userid авториз пользователя
  if ( orderid2.connid ) {
    try {

      await dbpgApp1.query( 'begin;' );

      await dbpgApp1.query(`update connections set user_id=${userid} where id=${orderid2.connid}`)

      await dbpgApp1.query( 'commit;' );

      return true;

    } catch (e) {

      await dbpgApp1.query( 'rollback;' );

      throw e;
    }
  }

  return true
}

module.exports = {
  queryStat: (text, params) => dbpgStat.query( text, params ),
  queryApp: (text, params) => dbpgApp1.query( queries[text](params) ),
  queryStat1: (text, params) => dbpgStat.query( queries[text](params) ),
  getConnectionOrder,
  chngOrder,
  procOrder,
  unitOrders
}
