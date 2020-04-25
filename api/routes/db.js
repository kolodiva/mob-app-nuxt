import express from 'express'
const consola = require('consola')

  const { Pool } = require('pg')

  let conn_param  = {};

  if (process.env.NODE_ENV == 'production') {
    conn_param = {'host':'134.209.232.17', 'password':'123', 'port':'5432'};
  } else {
    conn_param = {'host':'localhost', 'password':'123456', 'port':'5433'};
  }

  const dbpg = new Pool({
    database: 'app1',
    user: 'postgres',
    host: conn_param.host,
    password: conn_param.password,
    port: conn_param.port,
  })

const { Router } = require('express')

  const router = Router()

  router.use(express.json())


  router.get('/db', function(req, res, next) {
      //res.json({foo: 1})
      dbpg.query(
            "select * from nomenklators where itgroup and parentguid is null and guid not in ('yandexpagesecret', 'sekretnaya_papka') order by name"
          )
          .then((res1) => {
            res.json( res1.rows )
          });

  })

  router.get('/db/:id', function(req, res, next) {
    let id = req.params.id
    let sql = `select t1.*, t2.name pName from nomenklators t1 inner join nomenklators t2 on t1.parentguid=t2.guid where t1.parentguid='${id}' and t1.guid not in ('yandexpagesecret', 'sekretnaya_papka') order by t1.artikul`
    //console.log( sql );
    dbpg.query(
            sql
        )
        .then((res1) => {
          res.json( res1.rows )
        });
  })

  module.exports = router
