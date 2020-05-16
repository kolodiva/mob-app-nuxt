
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

module.exports = {
  queryApp: (text, params) => dbpgApp1.query( queries[text](params) ),
  queryStat: (text, params) => dbpgStat.query(text, params),
}
