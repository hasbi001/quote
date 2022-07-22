const db = require("../models");
const Quote = db.quote;
const Op = db.Sequelize.Op;
const axios = require('axios');


exports.create = (req, res) => {
  
  if (!req.body.quote) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  const data = {
    quote: req.body.quote,
    favorite: req.body.favorite
  };


  var condition = req.body.quote ? { quote: { [Op.like]: `%${req.body.quote}%` } } : null;
    Quote.findOne({where: condition})
    .then(value => {
      if (value) {
        res.status(400).send({
            message: `Quote is duplicate`
        });
      } else {
        Quote.create(data)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the quote."
          });
        });
      }
    })
    .catch(err => {
        Quote.create(data)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the quote."
          });
        });
    });
};

exports.findAll = (req, res) => {

    var quote = req.body.quote ? { quote: { [Op.like]: `%${req.body.quote}%` } } : null;
    var favorite = req.body.favorite ? { favorite: { [Op.like]: `%${req.body.favorite}%` } } : null;
    var result = [];
    var dataquote = [];
    var datafav = [];
    var counter = 0;
    Quote.findAll({where: quote,favorite})
      .then(data => {
        // res.send(data);
        data.forEach(function(value,index) {
          dataquote.push(value.quote) ;
          datafav.push(value.favorite);
        });
        result.push(dataquote);
        result.push(datafav); 
        res.send(result);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Quote."
        });
      });
};

exports.findOne = (req, res) => {
    var quote = req.body.quote ? { quote: { [Op.like]: `%${req.body.quote}%` } } : null;
    var favorite = req.body.favorite ? { favorite: { [Op.like]: `%${req.body.favorite}%` } } : null;
    Quote.findOne({where: quote,favorite})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Quote with quote=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Quote with quote=" + id
      });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Quote.update(req.body, {
        where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Quote was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Quote with id=${id}. Maybe Quote was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Quote with id=" + id
      });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Quote.destroy({
        where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Quote was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Quote with id=${id}. Maybe Quote was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Quote with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
    Quote.destroy({
        where: {},
        truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Quotes were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while removing all quotes   ."
            });
        });
};

exports.findAllByApi = async (req, res) => {
    let getData = await axios.get('https://api.kanye.rest/');

    let x = getData.data.quote;
    var data = {
        quote: x,
        favorite: null
      };
      var condition = x ? { quote: { [Op.like]: `%${x}%` } } : null;
      Quote.findOne({where: condition})
      .then(value => {
        if (value) {
          res.status(400).send({
              message: `Quote is duplicate`
          });
        } else {
          Quote.create(data)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message 
            });
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message
        });
      });

    // res.send(data);
};

function validate(quote) {
    var condition = quote ? { quote: { [Op.like]: `%${quote}%` } } : null;
    Quote.findAll({where: condition})
    .catch(err => {
      return true;
    });
    return false;
};