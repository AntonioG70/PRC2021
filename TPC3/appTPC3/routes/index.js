var express = require('express');
var axios = require('axios')
var router = express.Router();

var prefixes = `

    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    PREFIX owl: <http://www.w3.org/2002/07/owl#>

    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    PREFIX noInferences: <http://www.ontotext.com/explicit>

    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

`
var prefixosOnt = []

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:7200/rest/repositories')
    .then(dados => {
      res.render('index', {reps: dados.data})
    })
    .catch(erro => console.log(erro))
})


router.get('/repositorios/:id', function(req, res){
  var getLink = "http://localhost:7200/repositories/" + req.params.id + "?query=" 
  var query = `select * where {
              ?i rdf:type owl:Class}`
  var encoded = encodeURIComponent(prefixes + query)
  
  axios.get(getLink + encoded)
    .then(dados => {
      prefixosOnt[req.params.id] = 'PREFIX : <' + dados.data.results.bindings[0].i.value.split('#')[0] + '#>'

      var props = dados.data.results.bindings.map(bind => {return {
          i: (bind.i.type == 'literal') ? bind.i.value : bind.i.value.split('#')[1]
      }})
      res.render('classes', {info: props, idREP: req.params.id})
    })    
    .catch(erro => console.log(erro))
})

router.get('/repositorios/:id/:classe', function(req, res){
  var getLink = "http://localhost:7200/repositories/" + req.params.id + "?query=" 
  var query = prefixosOnt[req.params.id] + ` select * where {
              ?i rdf:type :` + req.params.classe + `}`
           
  var encoded = encodeURIComponent(prefixes + query)
  //console.log("QUERY--------------------" + prefixes + query)
  axios.get(getLink + encoded)
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => {return {
        i: (bind.i.type == 'literal') ? bind.i.value : bind.i.value.split('#')[1]
      }})
      res.render('individuos', {info: props, idREP: req.params.id, idClasse: req.params.classe})
    })
    .catch(erro => console.log(erro))
})

router.get('/repositorios/:id/:classe/:ind', function(req, res){
  var getLink = "http://localhost:7200/repositories/" + req.params.id + "?query=" 
  var query = prefixosOnt[req.params.id] + ` select * where {
              :` + req.params.ind + `?p ?o }`
           
  var encoded = encodeURIComponent(prefixes + query)
  axios.get(getLink + encoded)
    .then(dados => {
      var props = dados.data.results.bindings.map(bind => {return {
        p: (bind.p.type == 'literal') ? bind.p.value : bind.p.value.split('#')[1],
        o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1]
      }})
      res.render('indInfo', {info: props, idREP: req.params.id, idClasse: req.params.classe, idInd: req.params.ind})
    })
    .catch(erro => console.log(erro))
})

module.exports = router;
