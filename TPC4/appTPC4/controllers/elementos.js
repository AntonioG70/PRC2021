var axios = require('axios')
var prefixes = `

    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    PREFIX owl: <http://www.w3.org/2002/07/owl#>

    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    PREFIX noInferences: <http://www.ontotext.com/explicit>

    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

    PREFIX : <http://www.daml.org/2003/01/periodictable/PeriodicTable#>

`

module.exports.listElementos = () => {
    var getLink = "http://localhost:7200/repositories/tabelaPeriodica?query=" 
    var query = `select * where {
              ?e rdf:type :Element}`
    var encoded = encodeURIComponent(prefixes + query)
    
    return axios.get(getLink + encoded)
}

module.exports.getElemento = (id) => {
    var getLink = "http://localhost:7200/repositories/tabelaPeriodica?query=" 
    var query = `select * where {
              :` + id + ` ?p ?o}`
    var encoded = encodeURIComponent(prefixes + query)
    
    return axios.get(getLink + encoded)
}