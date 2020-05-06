import express from 'express'
const consola = require('consola')

  const { Pool } = require('pg')

  let conn_param  = {};
  let conn_param_statistica  = {};

  if (process.env.NODE_ENV == 'production') {
    //conn_param = {'host':'134.209.232.17', 'password':'123', 'port':'5432'};
    //Не забудь зольДат поменять при размещении на RF
    // conn_param = {'host':'172.17.0.2', 'password':'c2ec57df699966b3afef779a16fa5fff', 'port':'5432'};
    // conn_param_statistica = {'host':'172.17.0.3', 'password':'27ac4a1dd6873624b7535fe5660740d6', 'port':'5432'};
    //размещение DO
    conn_param = {'host':'localhost', 'password':'123', 'port':'5432'};
    conn_param_statistica = {'host':'localhost', 'password':'123', 'port':'5432'};

  } else {
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


  router.get('/db', function(req, res, next) {
      //res.json({foo: 1})
      //consola.info('11111111111111111111111111111111111111111');

      dbpg.query(
            "select * from nomenklators where itgroup and parentguid is null and guid not in ('yandexpagesecret', 'sekretnaya_papka') order by name"
          )
          .then((res1) => {
            res.json( {data: res1.rows} )
          });

  })

  router.get('/db/:id', function(req, res, next) {
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
  router.get('/db_old1/:id', function(req, res, next) {
    let id = req.params.id
    let sql = `select t1.*, t2.name pName from nomenklators t1 inner join nomenklators t2 on t1.parentguid=t2.guid where t1.parentguid='${id}' and t1.guid not in ('yandexpagesecret', 'sekretnaya_papka') order by t1.artikul`
  //  console.log( sql );
    dbpg.query(
            sql
        )
        .then((res1) => {
          res.json( res1.rows )
        });
  })
  //statistica
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

  router.post('/session', function(req, res, next) {

    consola.info('22222222222222222222222222222222222222');

    dbpg.query(
          `select password_digest from users where email='${req.body.email}'`
        )
        .then((res1) => {
          if (res1.rows.length === 0) {
            return res.status(401).send('Пользователь с таким адресом НЕ найден - на регистрацию.');
          } else {
            return res.json({token: '1324567891234567890'});
          }
        });



      // if (req.body.email != 'kolodiva@mail.ru') {
      //   return res.send(401, ' Invalid token for: ' + req.body.email);
      // }



            //return

            //res.json('{}', 404);

  })
  router.get('/user', function(req, res, next) {
      //res.json({foo: 1})
      res.json( {user: {id:15, username: 'Peter', user: 'Peter', name: 'Vittorio'}} )

  })

  module.exports = router
