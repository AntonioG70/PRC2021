var express = require('express');
var router = express.Router();
var Pubs = require('../controllers/pubs')

router.get('/', function(req, res, next) {
  Pubs.listPubs()
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => {return {
      p: (bind.p.type == 'literal') ? bind.p.value : bind.p.value.split('#')[1]
      }})
      res.send(props)
    })
    .catch(e => console.log(e))
});

/*
router.get('/tipo', function(req, res){
  if(req.query.type != null){
    Pubs.getPubsTipo(req.query.type)
      .then(dados => {
        var props = dados.data.results.bindings.map(bind => {return {
        p: (bind.p.type == 'literal') ? bind.p.value : bind.p.value.split('#')[1]
        }})
      res.render('pubTipo', {info: props, tipo: req.query.type})
    })
      .catch(e => console.log(e))
  }
  else{
    res.render('tipo')
  }
})
*/

router.get('/:id', function(req, res){
  Pubs.getPub(req.params.id)
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => {return {
        p: (bind.p.type == 'literal') ? bind.p.value : bind.p.value.split('#')[1],
        o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1] 
      }})
      res.send(props)
    })
    .catch(e => console.log(e))
})

module.exports = router;
