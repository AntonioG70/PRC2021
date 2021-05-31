var axios = require('axios')

var prefixes = `

    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    PREFIX owl: <http://www.w3.org/2002/07/owl#>

    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    PREFIX noInferences: <http://www.ontotext.com/explicit>

    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

    PREFIX : <http://www.semanticweb.org/antóniocarvalho/ontologies/emd#>

`

module.exports.listEMD = () => {
    var getLink = "http://localhost:7200/repositories/EMD?query=" 
    var query = `select ?e ?a ?d ?r where {
      ?e rdf:type :EMD;
         :data ?d;
         :resultado ?r;
         :feitoEmAtleta ?a.
  }`
    var encoded = encodeURIComponent(prefixes + query)
    
    return axios.get(getLink + encoded)
}

module.exports.listEMDOK = () => {
  var getLink = "http://localhost:7200/repositories/EMD?query=" 
  var query = `select ?e ?a ?d ?r where {
    ?e rdf:type :EMD;
       :data ?d;
       :resultado ?r;
       :feitoEmAtleta ?a.
  }`
  var encoded = encodeURIComponent(prefixes + query)
  
  return axios.get(getLink + encoded)
}

module.exports.getEMD = (id) => {
  var getLink = "http://localhost:7200/repositories/EMD?query=" 
  var query = `select ?a ?d ?r where {`
    + `:` + id + ` rdf:type :EMD;
       :data ?d;
       :resultado ?r;
       :feitoEmAtleta ?a.
  } `
  var encoded = encodeURIComponent(prefixes + query)
  console.log(query)
  return axios.get(getLink + encoded)
}

