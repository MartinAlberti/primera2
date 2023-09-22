export default  function auth(req, res, next) {
  const { email } = req.body;
  console.log(req.session.email);

  if (email == "adminCoder@coder.com" && password == "dminCod3r123" ) {
    req.session.email = email;
    console.log("felicitaciones ingresaste correctamente", email);
    return res.redirect("/static/realtimeproducts");
  }
  
  return next(); 
}
