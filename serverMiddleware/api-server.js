export default async (req, res, next) => {

  //console.log(req._parsedUrl.pathname)

  let url = req._parsedUrl.pathname.replace(/^\/+|\/+$|\.+/g, "");

  url = url.split("/");

  let method = url.pop();

  let controller = url.slice(1).join("/");

  if (method === 'session') {
    controller = 'session';
    method = 'index';
    req.params.keyUser = req.cookies._keyUser;
  }

  if (method === 'userAuth') {
    controller = 'session';
    req.params.keyUser = req.cookies['auth._token.local'];
  }

  let api = require("../api/" + controller);

  req.params.connectionid = req.cookies.connectionid;

  let result = await api[ method ](req.params, res);

  res.setHeader("Set-Cookie", "Secure; SameSite=None");

  if (result.status) {
    res.status(result.status).end(result.msg);
  } else {
    res.end(JSON.stringify(result));
  }

};
