var express = require('express');
var router = express.Router();
var EMD = require('../controllers/emd')
var Modalidade = require('../controllers/modalidade')
var Atleta = require('../controllers/atleta')

router.get('/emd', function(req, res, next) {
  if(req.query.res == "OK"){
    EMD.listEMDOK()
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => {return {
      emd: (bind.e.type == 'literal') ? bind.e.value : bind.e.value.split('#')[1]
      //data: parseInt((bind.numPubs.type == 'literal') ? bind.numPubs.value : bind.numPubs.value.split('#')[1])
      }})
      res.send(props)
    })
  }
  else{
    EMD.listEMD()
      .then(dados => {
        var props = dados.data.results.bindings.map(bind => {return {
        id: (bind.e.type == 'literal') ? bind.e.value : bind.e.value.split('#')[1],
        nome: (bind.a.type == 'literal') ? bind.a.value : bind.a.value.split('#')[1],
        resultado: (bind.r.type == 'literal') ? bind.r.value : bind.r.value.split('#')[1],
        data: (bind.d.type == 'literal') ? bind.d.value : bind.d.value.split('#')[1]
        //data: parseInt((bind.numPubs.type == 'literal') ? bind.numPubs.value : bind.numPubs.value.split('#')[1])
        }})
        res.send(props)
      })
      .catch(e => console.log(e))
  }
});

router.get('/emd/:id', function(req, res, next) {
  EMD.getEMD(req.params.id)
    .then(dados => {
      console.log(dados.data.results.bindings)
      var props = dados.data.results.bindings.map(bind => {return {
      nome: (bind.a.type == 'literal') ? bind.a.value : bind.a.value.split('#')[1],
      resultado: (bind.r.type == 'literal') ? bind.r.value : bind.r.value.split('#')[1],
      data: (bind.d.type == 'literal') ? bind.d.value : bind.d.value.split('#')[1]
      //data: parseInt((bind.numPubs.type == 'literal') ? bind.numPubs.value : bind.numPubs.value.split('#')[1])
      }})
      res.send(props)
    })
    .catch(e => console.log(e))
});

router.get('/modalidades', function(req, res){
  Modalidade.listModalidades()
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => {return {
        modalidade: (bind.m.type == 'literal') ? bind.m.value : bind.m.value.split('#')[1]
      }})
      res.send(props)
    })
    .catch(e => console.log(e))
})

router.get('/modalidades/:id', function(req, res){
  Modalidade.getModalidadesEDM(req.params.id)
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => {return {
        emd: (bind.e.type == 'literal') ? bind.e.value : bind.e.value.split('#')[1]
      }})
      res.send(props)
    })
    .catch(e => console.log(e))
})

router.get('/atletas', function(req, res){
  if(req.query.gen == "F"){
    Atleta.getAtletaF()
      .then(dados => {
        var props = dados.data.results.bindings.map(bind => {return {
          atleta: (bind.a.type == 'literal') ? bind.a.value : bind.a.value.split('#')[1]
        }})
        res.send(props)
      })
  }
  else if(req.query.clube){
    Atleta.getAtletaClube(req.query.clube)
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => {return {
        atleta: (bind.a.type == 'literal') ? bind.a.value : bind.a.value.split('#')[1]
      }})
      res.send(props)
    })
    .catch(e => console.log(e))
  }
  
})

module.exports = router;