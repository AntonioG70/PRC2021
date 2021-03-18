var express = require('express');
var router = express.Router();
var Elementos = require('../controllers/elementos')

router.get('/', function(req, res, next) {
    Elementos.listElementos()
        .then(dados => {
            var props = dados.data.results.bindings.map(bind => {return {
            e: (bind.e.type == 'literal') ? bind.e.value : bind.e.value.split('#')[1]
        }})
        res.render('pagElementos', {info: props})
    })
});

router.get('/:id', function(req, res){
    Elementos.getElemento(req.params.id)
        .then(dados => {
            var props = dados.data.results.bindings.map(bind => {return {
                p: (bind.p.type == 'literal') ? bind.p.value : bind.p.value.split('#')[1],
                o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1] 
            }})
            res.render('elemento', {info: props, idElem: req.params.id})
        })
})

module.exports = router;
