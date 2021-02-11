export default async (req, res, next) => {

  try {
     decodeURIComponent(req.originalUrl);
     //req.url = encodeURI(req.url);

     next();
   } catch (e) {

     const url = encodeURI(unescape(req.originalUrl));

     // console.log(req.url);
     // console.log(req.originalUrl);
     // console.log(url);

     req.url = url;

     next();

     //console.log(url);

     // res.writeHead(302,
     //   { Location: url }
     // );
     // res.end();
   }};
