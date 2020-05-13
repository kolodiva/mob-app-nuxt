import express from 'express'
const {matchPass, genPass} = require('../crypto')
const {getConnOrder, chngOrder, getOrderIdByConnectionId, getOrderIdByConnectionIdUserId} = require('../db-utils')

const consola = require('consola')

  const { Pool } = require('pg')

  let conn_param  = {};
  let conn_param_statistica  = {};

  if (process.env.NODE_ENV == 'production') {
    //conn_param = {'host':'134.209.232.17', 'password':'123', 'port':'5432'};
    //Не забудь зольДат поменять при размещении на RF
    // conn_param = {'host':'172.17.0.3', 'password':'c2ec57df699966b3afef779a16fa5fff', 'port':'5432'};
    // conn_param_statistica = {'host':'172.17.0.2', 'password':'27ac4a1dd6873624b7535fe5660740d6', 'port':'5432'};
    //размещение DO
    conn_param = {'host':'localhost', 'password':'123', 'port':'5432'};
    conn_param_statistica = {'host':'localhost', 'password':'123', 'port':'5432'};

  } else {
    // conn_param = {'host':'localhost', 'password':'123', 'port':'5432'};
    // conn_param_statistica = {'host':'localhost', 'password':'123', 'port':'5432'};
    conn_param = {'host':'localhost', 'password':'123456', 'port':'5433'};
    conn_param_statistica = {'host':'localhost', 'password':'123456', 'port':'5433'};
  }

  const dbpg = new Pool({
    database: 'app1',
    user: 'postgres',
    host: conn_param.host,
    password: conn_param.password,
    port: conn_param.port,
  })

  const dbpg_stat = new Pool({
    database: 'statistica',
    user: 'postgres',
    host: conn_param_statistica.host,
    password: conn_param_statistica.password,
    port: conn_param_statistica.port,
  })

const { Router } = require('express')

  const router = Router()

  router.use(express.json())


  router.get('/db', async function(req, res, next) {
      //res.json({foo: 1})
      //consola.info('11111111111111111111111111111111111111111');
      let errList = []

      const orderInfo = await getOrderIdByConnectionId(dbpg, req, errList);

      dbpg.query(
            "select * from nomenklators where itgroup and parentguid is null and guid not in ('yandexpagesecret', 'sekretnaya_papka') order by name"
          )
          .then((res1) => {
            res.json( {recs: res1.rows, countCart: orderInfo.count_goods} )
          });

  })

  router.get('/db/:id', async function(req, res, next) {

    let id = req.params.id
    let errList = []
    let rec = []

    const orderInfo = await getOrderIdByConnectionId(dbpg, req, errList);

    //consola.info(orderInfo);

    //'${id}'
    //create extension if not exists tablefunc;
    let sql = `

		with price_list_total as (

			with price_list_with_compl as (

			select *
			from crosstab(
			$$select nomenklator_id::text, price_type_id, round(price*coalesce(currencies.value, 1), 2)
			from prices
			left join currencies on prices.currency_id = currencies.code

			where nomenklator_id in (

			select distinct
					coalesce(complects.guid_complect, nomenklators.guid) as guid

				from nomenklators

			           left join complects on complects.nomenklator_id = nomenklators.guid

			           where nomenklators.parentguid='${id}' and nomenklators.guid not in ('yandexpagesecret', 'sekretnaya_papka')

			)

			order by 1$$,
			$$ SELECT '000000004' UNION ALL SELECT '000000003' UNION ALL SELECT '000000005'$$
			)

			AS (guid text, price1 numeric, price2 numeric, price3 numeric)
			)

		select
			nomenklators.guid,

			sum(round(coalesce(complects.qty, 1) * pl.price1, 2)) as price1,
			sum(round(coalesce(complects.qty, 1) * pl.price2, 2)) as price2,
			sum(round(coalesce(complects.qty, 1) * pl.price3, 2)) as price3

			from nomenklators

			   left join complects on complects.nomenklator_id = nomenklators.guid
		   	   join price_list_with_compl as pl on pl.guid = nomenklators.guid or pl.guid = complects.guid_complect

		   	   group by nomenklators.guid)

		select
    --nomenklators.weight,
				nomenklators.guid,
		 		nomenklators.parentguid,
		        nomenklators.artikul,
		        nomenklators.artikul_new,
		        nomenklators.name,
		        nomenklators.synonym,
		        nomenklators.itgroup,
		        nomenklators.guid_picture,
		        nomenklators.sort_field,
		        nomenklators.describe,
		        nomenklators.is_complect,
		        case when nomenklators.itgroup then '' else coalesce( case when nomenklators.is_complect > 0 then 'компл.' else unit_types.name end, 'нет ед.изм.') end as unit_name,

			COALESCE(price_list_total.price1, 0.00) as price1,
			COALESCE(price_list_total.price2, 0.00) as price2,
			COALESCE(price_list_total.price3, 0.00) as price3,

			COALESCE(order_goods.qty, 0) as qty1,
      COALESCE(order_goods.qty, 0) as qty2,

			round(COALESCE(order_goods.price, 0.00), 2) as price_order,

      round(COALESCE(price_list_total.price1, 0.00)*COALESCE(order_goods.qty, 0.0000), 2) as total,

		    nomenklators.intrnt_keyword, nomenklators.intrnt_title, nomenklators.intrnt_description, nomenklators.intrnt_og_title

			from nomenklators

			left join price_list_total on nomenklators.guid = price_list_total.guid

			left join orders on orders.id = ${orderInfo.order_id} and orders.status = 0
			left join order_goods on order_goods.order_id = ${orderInfo.order_id} and price_list_total.guid = order_goods.nomenklator_id

			left join unit_types on nomenklators.unit_type_id = unit_types.code

			where nomenklators.parentguid='${id}' and nomenklators.guid not in ('yandexpagesecret', 'sekretnaya_papka')

			ORDER BY  nomenklators.itgroup desc, nomenklators.sort_field, nomenklators.name, nomenklators.artikul
      `
    //consola.log( sql );

    await dbpg.query(
            sql
        )
        .then((res1) => {
          res.json( {recs: res1.rows, countCart: orderInfo.count_goods} )
        });
  })

  router.get('/db_old/:id', function(req, res, next) {
    let id = req.params.id
    //create extension if not exists tablefunc;
    //replace(nomenklators.guid_picture, '_250x250', '_82x82') guid_picture,
    let sql = `
    		with price_list_total as (

    			with price_list_with_compl as (

    			select *
    			from crosstab(
    			$$select nomenklator_id::text, price_type_id, round(price*coalesce(currencies.value, 1), 2)
    			from prices
    			left join currencies on prices.currency_id = currencies.code

    			where nomenklator_id in (

    			select distinct
    					coalesce(complects.guid_complect, nomenklators.guid) as guid

    				from nomenklators

    			           left join complects on complects.nomenklator_id = nomenklators.guid

    			           where nomenklators.parentguid='${id}' and nomenklators.guid not in ('yandexpagesecret', 'sekretnaya_papka')

    			)

    			order by 1$$,
    			$$ SELECT '000000004' UNION ALL SELECT '000000003' UNION ALL SELECT '000000005'$$
    			)

    			AS (guid text, price1 numeric, price2 numeric, price3 numeric)
    			)

    		select
    			nomenklators.guid,

    			sum(round(coalesce(complects.qty, 1) * pl.price1, 2)) as price1,
    			sum(round(coalesce(complects.qty, 1) * pl.price2, 2)) as price2,
    			sum(round(coalesce(complects.qty, 1) * pl.price3, 2)) as price3

    			from nomenklators

    			   left join complects on complects.nomenklator_id = nomenklators.guid
    		   	   join price_list_with_compl as pl on pl.guid = nomenklators.guid or pl.guid = complects.guid_complect

    		   	   group by nomenklators.guid)

    		select 	nomenklators.guid,
    		 		nomenklators.parentguid,
    		        nomenklators.artikul,
    		        nomenklators.artikul_new,
    		        nomenklators.name,
    		        nomenklators.synonym,
    		        nomenklators.itgroup,
    		        replace(nomenklators.guid_picture, '_250x250', '_82x82') guid_picture,
    		        nomenklators.sort_field,
    		        nomenklators.describe,
    		        nomenklators.is_complect,
    		        case when nomenklators.itgroup then '' else coalesce( case when nomenklators.is_complect > 0 then 'компл.' else unit_types.name end, 'нет ед.изм.') end as unit_name,

    			COALESCE(price_list_total.price1, 0.00) as price1,
    			COALESCE(price_list_total.price2, 0.00) as price2,
    			COALESCE(price_list_total.price3, 0.00) as price3,
          '' qty1,
          '' qty2,
          0 total,

    		    nomenklators.intrnt_keyword, nomenklators.intrnt_title, nomenklators.intrnt_description, nomenklators.intrnt_og_title, parentNomenklator.name pName

    			from nomenklators
           inner join nomenklators parentNomenklator on nomenklators.parentguid = parentNomenklator.guid

    			left join price_list_total on nomenklators.guid = price_list_total.guid

    			left join unit_types on nomenklators.unit_type_id = unit_types.code

    			where nomenklators.parentguid='${id}' and nomenklators.guid not in ('yandexpagesecret', 'sekretnaya_papka')

    			ORDER BY  nomenklators.itgroup desc, nomenklators.sort_field, nomenklators.name, nomenklators.artikul
          `
    //consola.log( sql );
    dbpg.query(
            sql
        )
        .then((res1) => {
          res.json( {data: res1.rows} )
        });
  })


  router.get('/db_manegers/:id', function(req, res, next) {
    let id = req.params.id
    //create extension if not exists tablefunc;
    //replace(nomenklators.guid_picture, '_250x250', '_82x82') guid_picture,
    let sql = `
          select tmp.* from (

          select 0 filial, order_by, filials, name, tel_add, tel_mob, email, skype, region, position, 0 rozn from managers_site where position like '%Директор по продажам%'
          union all
          select 0 filial, order_by, filials, name, tel_add, tel_mob, email, skype, region, position, case when lower(region) like '%розница%' then 1 else 0 end from managers_site where filials='{1000000}'
          union all
          select 1 filial, order_by, filials, name, tel_add, tel_mob, email, skype, region, position, 0 rozn from managers_site where position like '%Директор по продажам%'
          union all
          select 1 filial, order_by, filials, name, tel_add, tel_mob, email, skype, region, position, case when lower(region) like '%розница%' then 1 else 0 end from managers_site where filials='{0000010}'
          union all
          select 5 filial, order_by, filials, name, tel_add, tel_mob, email, skype, region, position, 0 rozn from managers_site where position like '%Директор по продажам%'
          union all
          select 5 filial, order_by, filials, name, tel_add, tel_mob, email, skype, region, position, case when lower(region) like '%розница%' then 1 else 0 end from managers_site where filials='{0010000}'
          union all
          select 4 filial, order_by, filials, name, tel_add, tel_mob, email, skype, region, position, 0 rozn from managers_site where position like '%Директор по продажам%'
          union all
          select 4 filial, order_by, filials, name, tel_add, tel_mob, email, skype, region, position, case when lower(region) like '%розница%' then 1 else 0 end from managers_site where filials='{0000001}'
          union all
          select 3 filial, order_by, filials, name, tel_add, tel_mob, email, skype, region, position, 0 rozn from managers_site where position like '%Директор по продажам%'
          union all
          select 3 filial, order_by, filials, name, tel_add, tel_mob, email, skype, region, position, case when lower(region) like '%розница%' then 1 else 0 end from managers_site where filials='{0000100}'
          union all
          select 6 filial, order_by, filials, name, tel_add, tel_mob, email, skype, region, position, 0 rozn from managers_site where position like '%Директор по продажам%'
          union all
          select 6 filial, order_by, filials, name, tel_add, tel_mob, email, skype, region, position, case when lower(region) like '%розница%' then 1 else 0 end from managers_site where filials='{0100000}'
          union all
          select 2 filial, order_by, filials, name, tel_add, tel_mob, email, skype, region, position, 0 rozn from managers_site where position like '%Директор по продажам%'
          union all
          select 2 filial, order_by, filials, name, tel_add, tel_mob, email, skype, region, position, case when lower(region) like '%розница%' then 1 else 0 end from managers_site where filials='{0001000}'

        ) as tmp
          order by tmp.filial, tmp.rozn, tmp.order_by, tmp.name
          `
    //consola.log( sql );
    dbpg_stat.query(
            sql
        )
        .then((res1) => {
          res.json( res1.rows )
        });
  })

  router.get('/db_news', function(req, res, next) {
      //res.json({foo: 1})

      dbpg.query(
            `with t1 as (
              select 1000000 id, '/baner_korona_mob.jpg' pic, '/mf_komplekt_osoby_rezim_raboty.pdf' pdf, '60%' height
              union all
              select id, concat('https://www.newfurnitura.ru/news/', path_pic2) pic, concat('https://www.newfurnitura.ru/news/', path_pdf) pdf, '100%' height  from new_blocks where on_slider)
              select * from t1  order by id desc`
          )
          .then((res1) => {
            res.json( res1.rows )
          });

  })

  router.post('/session', async function(req, res, next) {

    const key = req.cookies._keyUser
    if (!key) {
      return res.status(403).send('Ваш запрос какой-то подозрительный.');
    }

    res.clearCookie("_keyUser");

    dbpg.query(
          `select password_digest from users where email='${req.body.email}'`
        )
        .then((resp) => {

        if (resp.rows.length === 0) {

            return res.status(404).send('Пользователь с таким адресом НЕ найден - на регистрацию.');

          } else {

            const match = matchPass(req.cookies._keyUser, req.body.password, resp.rows[0].password_digest)

            //console.log(match)

            //const match = bcrypt.compareSync(originalText, res1.rows[0].password_digest);
            if (match) {
                return res.json({token: resp.rows[0].password_digest});
            } else {
              return res.status(401).send('Введен неверный пароль, покрутите еще.');
            }
            }
          }
        )
  })

  router.get('/userAuth', async function(req, res, next) {

      let user = {id:1, username: 'Anonimus', name: 'Anonimus'}

      let errList = []

      const key = req.cookies['auth._token.local'];

      const orderInfo = await getOrderIdByConnectionId(dbpg, req, errList);
      let connectionid = req.cookies.connectionid

      await dbpg.query(
            `select id, email from users where password_digest='${key}'`
          )
          .then( async(resp) => {

            if (resp.rows.length > 0) {

              const rec = resp.rows[0]

              user.id       = rec.id
              user.username = rec.email
              user.name     = rec.email

              //переносим заказ с анонимуса на именного
              await dbpg.query(`
                select 1 curpos, t1.id user_id, t2.id conn_id, t2.remember_token, t3.id order_id
                from users t1
                left join connections t2 on t2.user_id = t1.id and t2.remember_token='${connectionid}'
                left join orders t3 on t3.connection_id = t2.id and t3.status=0
                where t1.id = 1

                union all

                select 2, t1.id user_id, t2.id conn_id, t2.remember_token, t3.id order_id
                from users t1
                left join connections t2 on t2.user_id = t1.id
                left join orders t3 on t3.connection_id = t2.id and t3.status=0
                where t1.id = ${rec.id}
                `
              ).then(async resp => {
                  //consola.log( resp.rows );
                  const recOld = resp.rows[0]
                  const recNew = resp.rows[1]

                  //если у авториз польз не было ничего кроме анонима то заказ анонима становится авториз польз.
                  if (recNew && recNew.user_id && !recNew.conn_id) {
                    await dbpg.query(`update connections set user_id=${recNew.user_id} where id=${recOld.conn_id}`)
                  }

                  //заходим с анонима БЕЗ товара в авторизованного где есть товар
                  if (recNew && recNew.remember_token && recOld && !recOld.remember_token) {
                    res.cookie("connectionid", recNew.remember_token, { maxAge: 31536000 });
                  }

                  //самый сложный вариант когда заказ анонима при авторизации объединяется с заказмо авторизованного.
                  if (recOld.order_id && recNew.order_id) {

                    await dbpg.query(`
                      with del as (
                        delete from order_goods where order_id in (${recOld.order_id}, ${recNew.order_id})
                        returning nomenklator_id, unit_type_id, qty, price, qty1, price1)
                        insert into order_goods(order_id, nomenklator_id, unit_type_id, qty, price, sum, qty1, price1, sum1)
                        select ${recNew.order_id} ord_id, nomenklator_id, unit_type_id, sum(qty) qty, max(price) price, sum(qty)*max(price) sum, sum(qty1) qty1, max(price1) price1, sum(qty1)*max(price1) sum1
                        from del
                        group by ord_id, nomenklator_id, unit_type_id
                      `)

                    res.cookie("connectionid", recNew.remember_token, { maxAge: 31536000 });
                  }

              })

              //////////////////////////////////////////////////
            }
          }).catch( e => {
          })

      return res.json( {user: user} )
  })

  router.post('/userNew', async function(req, res, next) {

    const pass_digest = genPass(req.body.password)

    dbpg.query(
            `insert into users(email, name, phone, password_digest, updated_at, created_at) values( '${req.body.email}', '${req.body.email}', '${req.body.phone}', '${pass_digest}',now(), now())`
          ).then(resp => {
              return res.status(200).send( 'ok' )
          }).catch((err) => {
              //console.log(err.detail)
              return res.status(404).send(err.detail);
    })
  })

  router.post('/chngeCart', async function(req, res, next) {

    let errList = []
    let rec = []

    const orderdata = await getConnOrder(dbpg, req, res, errList);

    if (errList.length === 0) {
      await chngOrder(dbpg, orderdata, req, errList).then((resp) => {
        if (errList.length === 0) {
          rec = resp.rec
        }
      })
    }

    const orderInfo = await getOrderIdByConnectionId(dbpg, req, errList);

    return res.status(200).json( {rows: rec, err: errList, countCart: orderInfo.count_goods} )
  })

  router.get('/order/:id', async function(req, res, next) {

      let errList = []
      let user_id = req.params.id

      const orderid = await getOrderIdByConnectionIdUserId(dbpg, req, res, user_id, errList);

      dbpg.query(
            `
            select t2.artikul, t2.name, t1.qty
            from order_goods t1
            inner join nomenklators t2 on t1.nomenklator_id=t2.guid
            where order_id='${orderid}'
            `
          )
          .then((res1) => {
            res.json( res1.rows )
          });

  })

  module.exports = router
