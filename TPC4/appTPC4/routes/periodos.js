var express = require('express');
var router = express.Router();
var Periodos = require('../controllers/periodos')

router.get('/', function(req, res){
    Periodos.listPeriodos()
        .then(dados => {
            var props = dados.data.results.bindings.map(bind => {return {
            p: (bind.p.type == 'literal') ? bind.p.value : bind.p.value.split('#')[1]
        }})
        res.render('pagPeriodos', {info: props})
    })
})

router.get('/:id', function(req, res){
    Periodos.getPeriodo(req.params.id)
        .then(dados => {
            var props = dados.data.results.bindings.map(bind => {return {
                p: (bind.p.type == 'literal') ? bind.p.value : bind.p.value.split('#')[1],
                o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1] 
            }})
            res.render('periodo', {info: props, idPeriodo: req.params.id})
        })
})

module.exports = router;
