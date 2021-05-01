import json

mapa = json.load(open("dataset.json", encoding='utf-8'))
f = open("mapa.ttl", "a")

for cidade in mapa["cidades"]:
    f.write("###http://www.semanticweb.org/antóniocarvalho/ontologies/mapa#" + cidade["id"] + '\n')
    f.write(":" + cidade["id"] +  " rdf:type owl:NamedIndividual ,\n")
    f.write("\t\t :Cidade;\n")
    for tag in cidade:
        if(tag != "id" and tag != 'população' and tag != "distrito"):
            newTag = tag.replace("ção", "cao")
            f.write(":" + newTag + " " + '"' + cidade[tag] + '";\n')

        if(tag == "população"):
            newTag = tag.replace("ção", "cao")
            f.write(":" + newTag + " " + cidade[tag] + ';\n')

        if(tag == 'distrito'):
            newDist =  cidade[tag].replace(" ", "_")
            f.write(":pertenceA " + ":Dist_" + newDist + ";\n")
            f.write(".")
            f.write("###http://www.semanticweb.org/antóniocarvalho/ontologies/mapa#Dist_" + newDist + '\n')
            f.write(":Dist_" + newDist +  " rdf:type owl:NamedIndividual ,\n")
            f.write("\t\t :Distrito.\n")

for ligacao in mapa["ligações"]:
    f.write("###http://www.semanticweb.org/antóniocarvalho/ontologies/mapa#" + ligacao["id"] + '\n')
    f.write(":" + ligacao["id"] +  " rdf:type owl:NamedIndividual ,\n")
    f.write("\t\t :Ligacao;\n")
    for tag in ligacao:
        if(tag == "distância"):
            newTag = tag.replace("â", "a")
            f.write(":" + newTag + " " +  str(ligacao[tag]) + ".\n")

        if(tag == "origem"):
            f.write(":temOrigem " + ":" + ligacao[tag] + ";\n")

        if(tag == "destino"):
            f.write(":temDestino " + ":" + ligacao[tag] + ";\n")
