
const { Pool } = require('pg')
const queries = require('./queries')

let conn_param  = null;
let conn_param_statistica = null;

if (process.env.NODE_ENV == 'production') {
  //размещение DO
  connParam1 = 'postgresql://postgres:123@localhost:5432/app1'
  connParam2 = 'postgresql://postgres:123@localhost:5432/statistica'

  //Не забудь зольДат поменять при размещении на RF
  // conn_param = {'host':'172.17.0.3', 'password':'c2ec57df699966b3afef779a16fa5fff', 'port':'5432'};
  // conn_param_statistica = {'host':'172.17.0.2', 'password':'27ac4a1dd6873624b7535fe5660740d6', 'port':'5432'};

  // connParam1 = 'postgresql://postgres:c2ec57df699966b3afef779a16fa5fff@172.17.0.3:5432/app1'
  // connParam2 = 'postgresql://postgres:27ac4a1dd6873624b7535fe5660740d6@172.17.0.2:5432/statistica'
} else {
  connParam1 = 'postgresql://postgres:123456@localhost:5433/app1'
  connParam2 = 'postgresql://postgres:123456@localhost:5433/statistica'
}

const dbpgApp1 = new Pool({
  connectionString: connParam1,
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

async function chngOrder( orderid, guid, qty, price ) {

  const res = await dbpgApp1.query( queries['chngOrder'](  orderid, guid, qty, price ) )

  return ( res[1].rowCount === 1 )
}

module.exports = {
  queryApp: (text, params) => dbpgApp1.query( queries[text](params) ),
  queryStat: (text, params) => dbpgStat.query(text, params),
  getConnectionOrder,
  chngOrder
}
