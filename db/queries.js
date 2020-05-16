function getUser(params) {
  return {
    name: 'fetch-user',
    text: 'SELECT * FROM users WHERE id = $1',
    values: params,
  }
}

function getCart(params) {
  return {
    name: 'get-cart',
    text: 'SELECT * FROM orders',
    values: params,
  }
}

module.exports = {
  getUser: getUser,
  getCart: getCart,
 };
