var axios = require('axios')

var prefixes = `

    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    PREFIX owl: <http://www.w3.org/2002/07/owl#>

    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    PREFIX noInferences: <http://www.ontotext.com/explicit>

    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

    PREFIX : <http://www.semanticweb.org/antóniocarvalho/ontologies/pubs#>

`

module.exports.listEditors = () => {
    var getLink = "http://epl.di.uminho.pt:8738/api/rdf4j/query/A85813-TP5?query=" 
    var query = `SELECT  ?e ?name ?numPubs
    WHERE {
      {
        SELECT ?e ?name (count(?pub) as ?numPubs)
        WHERE {
           ?e rdf:type :Editor;
                 :name ?name ;
                 ?p ?pub
           FILTER (?p in (:editou, :editorRefEm))
        } GROUP BY ?e ?name
      } UNION {
        SELECT ?e ?name (0 as ?numPubs)
        WHERE {
          ?e rdf:type :Editor ;
             :name   ?name ;
          FILTER not exists { ?e :editorRefEm ?pub }
          FILTER not exists { ?e :editou ?pub }
        }
      }
    }`
    var encoded = encodeURIComponent(prefixes + query)
    
    return axios.get(getLink + encoded)
}

module.exports.getEditorPubs = (id) => {
    var getLink = "http://epl.di.uminho.pt:8738/api/rdf4j/query/A85813-TP5?query=" 
    var query = `select ?pub where{
        :` + id + ` ?p ?pub
        FILTER (?p in (:editou, :editorRefEm))
    }`          
    var encoded = encodeURIComponent(prefixes + query)
    
    return axios.get(getLink + encoded)
}