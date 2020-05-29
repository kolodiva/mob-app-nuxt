function getUsers(params) {
  return {
    name: 'fetch-user',
    text: 'SELECT * FROM users WHERE id = $1',
    values: params,
  }
}

//orders
function getCart(params) {
  return {
    name: 'get-cart',
    text: `
      SELECT t2.guid, t2.artikul, t2.name, t1.qty
      FROM order_goods t1
      inner join nomenklators t2 on t1.nomenklator_id = t2.guid
      where order_id = $1
      order by t2.artikul
    `,
    values: params,
  }
}
function getConnOrder( strWhere ) {
  return {
    name: '',
    text: `
    select t1.id connid, t1.remember_token, t2.id orderid
    from connections t1
    inner join orders t2 on t2.connection_id = t1.id and t2.status=0
    ${strWhere}
    order by t1.id desc, t2.id desc
    limit 1
    `,
    values: [],
  }
}
function addNewConnOrder( userid ) {
  return {
    name: '',
    text: `
    with r1 as (insert into connections(user_id, remember_token, updated_at, created_at)
      values( ${userid}, uuid_generate_v4(), now(), now() ) RETURNING id, remember_token)
        insert into orders(connection_id, status, updated_at, created_at) values( (select id from r1), 0, now(), now())
            RETURNING id orderid, (select id from r1) connid, (select remember_token from r1)
    `,
    values: [],
  }
}
function chngOrder( orderid, guid, qty, price ) {
  return {
    name: '',
    text: `
    with deleted as (delete from order_good_complects where order_good_id in
      ( select id from order_goods where order_id = ${orderid} AND nomenklator_id = '${guid}'))
        delete from order_goods where order_id = ${orderid} AND nomenklator_id = '${guid}';
        insert into order_goods(order_id, nomenklator_id, qty, price )
    		select ${orderid}, '${guid}', ${qty || 0}, ${price} where ${qty || 0} > 0
    		RETURNING id, nomenklator_id, qty
    `,
    values: [],
  }
}
function unitOrders( params ) {

  const orderid1    = params.orderid1   || null
  const orderid2    = params.orderid2   || null
  const orderidnew  = params.orderidnew || null

  return {
    name: '',
    text: `
    with r1 as (
    insert into order_goods(order_id, nomenklator_id, unit_type_id, qty, price, sum, qty1, price1, sum1)
    SELECT ${orderidnew} order_id, nomenklator_id, unit_type_id, sum(qty) qty, max(price) price, sum(qty)*max(price) sum, sum(qty1) qty1, max(price1) price1, sum(qty1)*max(price1) sum1
    FROM order_goods
    where order_id in (${orderid1}, ${orderid2})
    group by
    nomenklator_id, unit_type_id
    returning id, nomenklator_id)

    insert into order_good_complects(order_good_id, complect_id, unit_type_id, qty, koeff, price, qty1, koeff1, price1)
    select r1.id order_id, t1.complect_id, t1.unit_type_id, sum(t1.qty) qty, max(t1.koeff) koeff, max(t1.price) price, sum(t1.qty1) qty1, max(t1.koeff1) koeff1, max(t1.price1) price1
    from order_good_complects t1
    inner join order_goods t2 on t1.order_good_id = t2.id and t2.order_id in (${orderid1}, ${orderid2})
    inner join r1 on r1.nomenklator_id = t2.nomenklator_id
    group by
    r1.id, t1.complect_id, t1.unit_type_id;

    delete from connections where id in ( select connection_id from orders where id in (${orderid1}, ${orderid2}));
    delete from orders where id in (${orderid1}, ${orderid2});
    delete from order_good_complects where order_good_id in (select id from order_goods where order_id in (${orderid1}, ${orderid2}));
    delete from order_goods where order_id in (${orderid1}, ${orderid2});
    `,
    values: [],
  }
}

//nomenklator
function getSubNomenklator(params) {

  const textqry=`

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

               where nomenklators.parentguid='${params.parentguid}' and nomenklators.guid not in ('yandexpagesecret', 'sekretnaya_papka')

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

    left join orders on orders.id = ${params.orderid || null} and orders.status = 0
    left join order_goods on order_goods.order_id = ${params.orderid || null} and price_list_total.guid = order_goods.nomenklator_id

    left join unit_types on nomenklators.unit_type_id = unit_types.code

    where nomenklators.parentguid='${params.parentguid}' and nomenklators.guid not in ('yandexpagesecret', 'sekretnaya_papka')

    ORDER BY  nomenklators.itgroup desc, nomenklators.sort_field, nomenklators.name, nomenklators.artikul
  `

  return {
    name: '',
    text: textqry,
    values: [],
  }
}

//users
function getUserByEmail({email}) {

  return {
    name: 'getUserByEmail',
    text: "select id userid, password_digest from users where email=$1",
    values: [email],
  }
}
function addNewUser({email, name, phone, password_digest}) {

  return {
    name: 'addNewUser',
    text: "insert into users(email, name, phone, password_digest, updated_at, created_at) values( $1, $2, $3, $4, now(), now())",
    values: [email, name ? name : email, phone, password_digest],
  }
}
function userAuth({keyUser}) {

  return {
    name: 'userAuth',
    text: 'select id, email, name, phone from users where password_digest=$1',
    values: [keyUser],
  }
}

module.exports = {
  getUsers,
  getCart,

  getConnOrder,
  addNewConnOrder,
  chngOrder,
  unitOrders,

  getSubNomenklator,
  getUserByEmail,
  addNewUser,
  userAuth,
 };