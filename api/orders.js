const db = require('../db')

async function getCart( params ) {

  //const conntoken =  req && req.params && req.params.connectionid
  //console.log( params )

  if ( params && params.userid ) {
    const {orderid} = await db.getConnectionOrder( params.userid, params.connectionid, false )
    //console.log( params, orderid )
    if (orderid) {
      const { rows } = await db.queryApp('getCart', [orderid])

      return rows
    }
  }

  return [];
}

async function chngeCart( { userid, guid, qty, connectionid, price1, unit_type_id }, res) {

  // console.log( userid, guid, qty, connectionid )

  const {connid, orderid, remember_token}  = await db.getConnectionOrder( userid, connectionid );

  // console.log( connid, orderid, remember_token )

  if (remember_token && remember_token != connectionid) {
      //res.cookie('connectionid', remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.cookie('connectionid', remember_token, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  }

  const resOk  = await db.chngOrder( orderid, guid, qty, price1, unit_type_id );

  return [];
}

async function procOrder( { userid, connectionid, mister, filial,  email, phone, info, mastercard } ) {

  let dbinfo

  // console.log( userid, guid, qty, connectionid )
  const {orderid} = await db.getConnectionOrder( userid, connectionid, false )

  if (userid === 1) {

    dbinfo = `Обращение: ${mister ? mister : '***'} / ${email ? email : '***'} / ${phone ? phone : '***'} / Предпочитаемый офис: ${filial ? filial : '***'} / Напутствие: ${info ? info : '***'}`
  } else {
    dbinfo = `- / Предпочитаемый офис: ${filial ? filial : '***'} / Напутствие: ${info ? info : '***'}`
  }

  const resOk  = await db.procOrder( orderid, dbinfo, mastercard );

  return [];
}

export { chngeCart, getCart, procOrder };
