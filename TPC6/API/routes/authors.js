var express = require('express');
var router = express.Router();
var Authors = require('../controllers/authors')

router.get('/', function(req, res, next) {
  Authors.listAuthors()
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => {return {
      a: (bind.a.type == 'literal') ? bind.a.value : bind.a.value.split('#')[1],
      name: (bind.name.type == 'literal') ? bind.name.value : bind.name.value.split('#')[1],
      numPubs: parseInt((bind.numPubs.type == 'literal') ? bind.numPubs.value : bind.numPubs.value.split('#')[1])
      }})
      res.send(props)
    })
    .catch(e => console.log(e))
});

router.get('/:id', function(req, res){
  Authors.getAuthorPubs(req.params.id)
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => {return {
        p: (bind.pub.type == 'literal') ? bind.pub.value : bind.pub.value.split('#')[1]
      }})
      res.send(props)
    })
    .catch(e => console.log(e))
})

module.exports = router;
