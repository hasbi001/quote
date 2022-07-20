module.exports = app => {
    const quotes = require("../controllers/quote.controller.js");
    var router = require("express").Router();
    
    router.post("/", quotes.create);
    
    router.post("/all", quotes.findAll);
    
    router.get("/byapi", quotes.findAllByApi);
    
    router.post("/one", quotes.findOne);
    
    router.put("/:id", quotes.update);
    
    router.delete("/:id", quotes.delete);
    
    router.delete("/", quotes.deleteAll);
    app.use('/api/quotes', router);
  };