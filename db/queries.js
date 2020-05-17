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
    text: 'SELECT * FROM orders',
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

    left join orders on orders.id = ${params.id} and orders.status = 0
    left join order_goods on order_goods.order_id = ${params.id} and price_list_total.guid = order_goods.nomenklator_id

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
    text: "select password_digest from users where email=$1",
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

  getSubNomenklator,
  getUserByEmail,
  addNewUser,
  userAuth,
 };
