var express = require('express');
var router = express.Router();
var Editors = require('../controllers/editors')

router.get('/', function(req, res, next) {
  Editors.listEditors()
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => {return {
      e: (bind.e.type == 'literal') ? bind.e.value : bind.e.value.split('#')[1],
      name: (bind.name.type == 'literal') ? bind.name.value : bind.name.value.split('#')[1],
      numPubs: parseInt((bind.numPubs.type == 'literal') ? bind.numPubs.value : bind.numPubs.value.split('#')[1])
      }})
      console.dir(props)
      res.send(props)
    })
    .catch(e => console.log(e))
});

router.get('/:id', function(req, res){
  Editors.getEditorPubs(req.params.id)
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => {return {
        p: (bind.pub.type == 'literal') ? bind.pub.value : bind.pub.value.split('#')[1]
      }})
      console.dir(props)
      res.send(props)
    })
    .catch(e => console.log(e))
})

module.exports = router;
