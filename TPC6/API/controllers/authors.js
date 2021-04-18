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
    var query = `SELECT  ?a ?name ?numPubs
    WHERE {
      {
        SELECT ?a ?name (count(?pub) as ?numPubs)
        WHERE {
           ?a rdf:type :Author;
                 :name ?name ;
                 ?p ?pub
           FILTER (?p in (:autorDe, :autorRefEm))
        } GROUP BY ?a ?name
      } UNION {
        SELECT ?a ?name (0 as ?numPubs)
        WHERE {
          ?a rdf:type :Author ;
             :name   ?name ;
          FILTER not exists { ?a :autorRefEm ?pub }
          FILTER not exists { ?a :autorDe ?pub }
        }
      }
    }`
    var encoded = encodeURIComponent(prefixes + query)
    
    return axios.get(getLink + encoded)
}

/*select * where {
  ?a rdf:type :Author;
       :name ?name;
       :autorDe ?pub.
} */

module.exports.getAuthorPubs = (id) => {
    var getLink = "http://epl.di.uminho.pt:8738/api/rdf4j/query/A85813-TP5?query=" 
    var query = `select ?pub where{
        :` + id + ` ?p ?pub
        FILTER (?p in (:autorDe, :autorRefEm))
    }`          
    var encoded = encodeURIComponent(prefixes + query)
    
    return axios.get(getLink + encoded)
}