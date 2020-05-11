import { v4 as uuidv4 } from 'uuid';

module.exports = {

  getOrderIdByConnectionId: async (dbpg, req, errList) => {

    let connectionid = req.cookies.connectionid
    let orderInfo    = {order_id: 0, count_goods: 0}

    if (connectionid) {

      await dbpg.query(`
        select t2.id order_id, count(t3.id) count_goods
        from connections t1
        left join orders t2 on t1.id=t2.connection_id and t1.remember_token='${connectionid}'
        left join order_goods t3 on t2.id=t3.order_id
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

    if (!connid && errList.length === 0) {

      const remToken  = uuidv4();
      const ipAddress = req.ip;

      await dbpg.query(`insert into connections(user_id, remember_token, updated_at, created_at, ipaddress) values( ${userid}, '${remToken}', now(), now(), '${ipAddress}') RETURNING id`
        ).then(resp => {

          res.cookie("connectionid", remToken);

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
