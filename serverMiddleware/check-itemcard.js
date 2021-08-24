export default (req, res, next) => {
const isContact = req.originalUrl.includes('?_escaped_') || req.originalUrl.includes('itemcard');
if (isContact) {
    res.status(404).send("Not found");
  } else {
  next();
  }
 };
