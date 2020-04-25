const { Pool } = require('pg')
//
// //
// // console.log('555555555555555555555555555555555555555555')
// //
// dbpg.query('select * from users limit 2').then((res) => {
//   console.log(res.rows)
// })
// //
// // console.log(global.pipec)

const userModel = {}

userModel.getNomenkl = () => {
  const dbpg = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'app1',
    password: '123456',
    port: 5433,
  })

  dbpg.query('select * from users limit 2').then((res) => {
    console.log(res.rows)
  })
}

export default userModel
