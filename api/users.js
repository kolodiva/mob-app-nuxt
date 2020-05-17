const db = require('../db')

// we can get data from any DB
function getDataFromDB() {
  return {data:[
  {
    "id": 3,
    "full_name": "Emma Wong",
    "highlight": false
  },
  {
    "id": 5,
    "full_name": "Charles Morris",
    "highlight": false
  },
  {
    "id": 1,
    "full_name": "George Bluth",
    "highlight": false
  },
  {
    "id": 2,
    "full_name": "Janet Weaver",
    "highlight": true
  },
{"id":4,"email":"eve.holt@reqres.in", "full_name": "eboskop", "first_name":"Eve","last_name":"Holt","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"},
  {
    "id": 6,
    "full_name": "Tracey Ramos",
    "highlight": false
  }
]}
}

async function index() {

  let res = await getDataFromDB();

  // return;

  // some business logic
  let ret = res.data.map(el => {
    return {
      id: el.id,
      full_name: el.full_name,
      highlight: el.full_name.charAt(0) === "J"
    };
  });
  ret = ret.sort(() => 0.5 - Math.random());

  return ret;
}

async function show({ id }) {

  //const { rows } = await db.queryApp('getUsers', [id])
  //console.log( rows );

  let {data} = await getDataFromDB();

  return data.filter(el => el.id == id)[0];
}

export { index, show };
