var express = require('express');
var router = express.Router();
var Grupos = require('../controllers/grupos')

router.get('/', function(req, res){
    Grupos.listGrupos()
        .then(dados => {
            var props = dados.data.results.bindings.map(bind => {return {
            g: (bind.g.type == 'literal') ? bind.g.value : bind.g.value.split('#')[1]
        }})
        res.render('pagGrupos', {info: props})
    })
})

router.get('/:id', function(req, res){
    Grupos.getGrupo(req.params.id)
        .then(dados => {
            var props = dados.data.results.bindings.map(bind => {return {
                p: (bind.p.type == 'literal') ? bind.p.value : bind.p.value.split('#')[1],
                o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1] 
            }})
            console.log(props)
            res.render('grupo', {info: props, idGrupo: req.params.id})
        })
})

module.exports = router;