var express = require('express');
var router = express.Router();
var Authors = require('../controllers/authors')

router.get('/', function(req, res, next) {
  Authors.listAuthors()
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => {return {
      p: (bind.p.type == 'literal') ? bind.p.value : bind.p.value.split('#')[1]
      }})
      res.render('authors', {info: props})
    })
    .catch(e => console.log(e))
});

router.get('/form', function(req, res){
  res.render('autForm')
})

router.post('/', function(req, res){
  Authors.addAutor(req.body.id, req.body.nome)
    .then(res.render('index'))
    .catch(e => console.log(e))
})

router.get('/:id', function(req, res){
  Authors.getAuthor(req.params.id)
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => {return {
        p: (bind.p.type == 'literal') ? bind.p.value : bind.p.value.split('#')[1],
        o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1] 
      }})
      res.render('pagAut', {info: props, idAut: req.params.id})
    })
    .catch(e => console.log(e))
})

module.exports = router;
