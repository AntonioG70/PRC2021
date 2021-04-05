var axios = require('axios')

var prefixes = `

    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    PREFIX owl: <http://www.w3.org/2002/07/owl#>

    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    PREFIX noInferences: <http://www.ontotext.com/explicit>

    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

    PREFIX : <http://www.semanticweb.org/antóniocarvalho/ontologies/pubs#>

`

module.exports.listAuthors = () => {
    var getLink = "http://epl.di.uminho.pt:8738/api/rdf4j/query/A85813-TP5?query=" 
    var query = `select * where {
              ?p rdf:type :Author}`
    var encoded = encodeURIComponent(prefixes + query)
    
    return axios.get(getLink + encoded)
}

module.exports.getAuthor = (id) => {
    var getLink = "http://epl.di.uminho.pt:8738/api/rdf4j/query/http://epl.di.uminho.pt:8738/api/rdf4j/update/A85813-TP5" 
    var query = `select * where {`
                + `:` + id + `?p ?o}`
    var encoded = encodeURIComponent(prefixes + query)
    
    return axios.get(getLink + encoded)
}

module.exports.addAutor = (id, nome) => {
    var query = `INSERT DATA {`
                + `:` + id + ` rdf:type :Author;
                :name "` + nome + `".}`
    console.log(prefixes + query)
    var encoded = encodeURIComponent(prefixes + query)
    console.log(encoded)
    return axios({
        method: 'post',
        url: "http://epl.di.uminho.pt:8738/api/rdf4j/update/A85813-TP5",
        headers: {"Content-Type" : "application/x-www-form-urlencoded"},
        data: {
          query: encoded
        }
      });
}