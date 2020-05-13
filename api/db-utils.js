import { v4 as uuidv4 } from 'uuid';

const getConnIdByUserId = async (dbpg, userId, errList) => {

  let connId = 0
  let orderId = 0
  let rem_token = ''

  await dbpg.query(`
    select t1.id connid, t2.id orderid, t1.remember_token
    from connections t1
    inner join orders t2 on t2.connection_id=t1.id and t2.status=0
    where t1.user_id=${userId}`
    ).then(resp => {

      if (resp.rowCount > 0) {

        connId    = resp.rows[0].connid
        orderId   = resp.rows[0].orderid
        rem_token = resp.rows[0].remember_token
      }

    }).catch(err => {
      errList.push(err.message)
    })

    return {connId, orderId, rem_token}
}

module.exports = {

  getOrderIdByConnectionId: async (dbpg, req, errList) => {

    let connectionid = req.cookies.connectionid
    let orderInfo    = {order_id: 0, count_goods: 0}

    if (connectionid) {

      await dbpg.query(`
        select t2.id order_id, count(t3.id) count_goods
        from connections t1
        left join orders t2 on t1.id=t2.connection_id and t2.status = 0
        left join order_goods t3 on t2.id=t3.order_id
        where t1.remember_token='${connectionid}'
        group by t2.id`
        ).then(resp => {
          if (resp.rowCount > 0) {
            orderInfo = resp.rows[0]
          }
        }).catch(err => {
          errList.push(err.message)
        })
    }

    return orderInfo;
},

  getOrderIdByConnectionIdUserId: async (dbpg, req, res, userid, errList) => {

    let connectionid = req.cookies.connectionid
    let orderid = 0

    if (connectionid) {

      await dbpg.query(`
        select t2.id order_id
        from connections t1
        inner join orders t2 on t1.id=t2.connection_id and t2.status = 0
        where t1.remember_token='${connectionid}' and t1.user_id='${userid}'
        `
        ).then(resp => {
          if (resp.rowCount > 0) {
            orderid = resp.rows[0].order_id
          }
        }).catch(err => {
          errList.push(err.message)
        })
    }

    //если пр таком конни юсер ничего не найдено пытаемся найти по юсеру откр заказ
    if(userid > 1 && orderid === 0) {
      const resp = await getConnIdByUserId(dbpg, userid, errList);
      if (resp.connId > 0) {
        orderid = resp.orderId
        res.cookie("connectionid", resp.rem_token, { maxAge: 31536000 });
      }
    }

  return orderid;
},

  getConnOrder: async (dbpg, req, res, errList) => {

    let connectionid = req.cookies.connectionid
    let connid  = undefined
    let orderid = undefined

    const userid = req.body.idUser

    if (connectionid) {

      await dbpg.query(`select id from connections where remember_token='${connectionid}' and user_id = ${userid}`
        ).then(resp => {
          connid = resp.rowCount > 0 ? resp.rows[0].id : undefined
        }).catch(err => {
          errList.push(err.message)
        })
    }

    //когда по каким то причинам connectionid слетел
    //или он не соовтетствует данным авторизации по userid НЕ аноним ищем активный Заказ и если он есть то уст кукис с этим коннекшеном
    if (!connid && userid > 1) {

      await dbpg.query(`
        select t1.id connid, t2.id orderid, t1.remember_token
        from connections t1
        inner join orders t2 on t2.connection_id=t1.id and t2.status=0
        where t1.user_id=${userid}`
        ).then(resp => {

          if (resp.row.length > 0) {

            connid = resp.rows[0].connid
            orderid = resp.rows[0].orderid

            res.cookie("connectionid", resp.rows[0].remember_token, { maxAge: 31536000 });
          }

        }).catch(err => {
          errList.push(err.message)
        })
    }

    if (!connid && errList.length === 0) {

      const remToken  = uuidv4();
      const ipAddress = req.ip;

      await dbpg.query(`
        insert into connections(user_id, remember_token, updated_at, created_at, ipaddress) values( ${userid}, '${remToken}', now(), now(), '${ipAddress}')
        RETURNING id`
        ).then(resp => {

          res.cookie("connectionid", remToken, { maxAge: 31536000 });

          connid = resp.rows[0].id

        }).catch(err => {
          errList.push(err.message)
        })
    }

    if (errList.length === 0) {

        await dbpg.query(`select id from orders where connection_id='${connid}' and status = 0`
          ).then(resp => {
            orderid = resp.rowCount > 0 ? resp.rows[0].id : undefined
          }).catch(err => {
            errList.push(err.message)
          })

        if (!orderid) {
          await dbpg.query(`insert into orders(connection_id, status, updated_at, created_at) values( ${connid}, 0, now(), now()) RETURNING id`
            ).then(resp => {
              orderid = resp.rows[0].id
            }).catch(err => {
              errList.push(err.message)
            })
        }
    }

    return {connid: connid, orderid: orderid}
  },

  chngOrder: async (dbpg, orderData, req, errList) => {

    const guid  = req.body.guid
    const qty   = Number(req.body.qty)
    let rec = []
    const orderid = orderData.orderid

    await dbpg.query(
      `with deleted as (delete from order_good_complects where order_good_id in
        ( select id from order_goods where order_id = ${orderid} AND nomenklator_id = '${guid}'))
					delete from order_goods where order_id = ${orderid} AND nomenklator_id = '${guid}'`
      ).catch(err => {
        errList.push(err.message)
      })

    if (qty > 0 && errList.length === 0) {

      await dbpg.query(
              `insert into order_goods(order_id, nomenklator_id, qty, price ) values(${orderid}, '${guid}', ${qty}, 123) RETURNING id, nomenklator_id, qty`
            ).then(resp => {
                rec = resp.rows[0]
            }).catch((err) => {
                errList.push(err.message)
      })
    }

    return {rec: rec}
  },

}
