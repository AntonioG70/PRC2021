import xml.etree.ElementTree as ET
root = ET.parse('jcrpubs.xml').getroot()

authorNames = []
editorNames = []

########################## insert phdtesis ########################################
for tag in root.findall('phdthesis'):
    idPub = tag.get('id')
    parsedID = idPub.replace('-', '_')
    authorRefs = []
    ar = ''
    year = ''
    month = ''
    school = ''
    doi = ''
    address = ''

    for tag2 in tag:

        if tag2.tag == 'author-ref':
            ar += f''':temAutorRef :{tag2.get('authorid')} ;\n\t\t     '''

        if tag2.tag == 'title':
            title = f''':title "{tag2.text}" ;'''

        if tag2.tag == 'year':
            year = f''':year {tag2.text} ;'''
 
        if tag2.tag == 'month':
            month = f''':month "{tag2.text}";'''

        if tag2.tag == 'school':
            school = f''':school "{tag2.text}";'''

        if tag2.tag == 'address':
            address = f''':address "{tag2.text}" ;'''

        if tag2.tag == 'doi':
            doi = f''':doi "{tag2.text}" ;'''                

    str = f'''### http://www.semanticweb.org/antóniocarvalho/ontologies/pubs#{parsedID}
              :{parsedID} rdf:type owl:NamedIndividual ,
                              :Publication , 
                              :Phdthesis ;
                     {ar}        
                     {title}
                     {address}
                     {school}
                     {year}
                     {month}
                     {doi} .'''
    f = open("pubs.ttl", "a")
    f.write(str)
    f.close()

################################### insert mastertesis #############################################
for tag in root.findall('masterthesis'):
    idPub = tag.get('id')
    parsedID = idPub.replace('-', '_')
    authorRefs = []
    ar = ''
    year = ''
    month = ''
    school = ''

    for tag2 in tag:

        if tag2.tag == 'author-ref':
            ar += f''':temAutorRef :{tag2.get('authorid')} ;\n\t\t     '''

        if tag2.tag == 'title':
            title = f''':title "{tag2.text}" ;'''

        if tag2.tag == 'year':
            year = f''':year {tag2.text} ;'''
 
        if tag2.tag == 'month':
            month = f''':month "{tag2.text}";'''

        if tag2.tag == 'school':
            school = f''':school "{tag2.text}";'''        

    str = f'''### http://www.semanticweb.org/antóniocarvalho/ontologies/pubs#{parsedID}
              :{parsedID} rdf:type owl:NamedIndividual ,
                              :Publication , 
                              :Masterthesis ;
                     {ar}        
                     {title}
                     {school}
                     {year}
                     {month} .'''
    f = open("pubs.ttl", "a")
    f.write(str)
    f.close()

######################### insert inproceedings #################################
for tag in root.findall('inproceedings'):
    idPub = tag.get('id')
    parsedID = idPub.replace('-', '_')
    doi = ''
    address = ''
    publisher = ''
    authorRefs = []
    authors = []
    ar = ''
    isbn = ''
    a = ''
    booktitle = ''
    year = ''
    month = ''

    for tag2 in tag:
        if tag2.tag == 'author':
            author = tag2.get('id')
            a += f''':temAutor :{author} ;\n\t\t     '''
            a+= '\n'
            if (author, tag2.text) not in authorNames:
                authorNames.append((author, tag2.text))

        if tag2.tag == 'author-ref':
            ar += f''':temAutorRef :{tag2.get('authorid')} ;\n\t\t     '''

        if tag2.tag == 'title':
            title = f''':title "{tag2.text}" ;'''

        if tag2.tag == 'booktitle':
            booktitle = f''':booktitle "{tag2.text}" ;'''

        if tag2.tag == 'address':
            address = f''':address "{tag2.text}" ;'''

        if tag2.tag == 'year':
            year = f''':year {tag2.text} ;'''
 
        if tag2.tag == 'month':
            month = f''':month "{tag2.text}";'''

        if tag2.tag == 'doi':
            doi = f''':doi "{tag2.text}" ;'''

        if tag2.tag == 'isbn':
            isbn = f''':isbn "{tag2.text}" ;'''   

    str = f'''### http://www.semanticweb.org/antóniocarvalho/ontologies/pubs#{parsedID}
              :{parsedID} rdf:type owl:NamedIndividual ,
                              :Publication , 
                              :InProceeding ;
                     {a}
                     {ar}        
                     {address}
                     {publisher}
                     {title}
                     {booktitle}
                     {year}
                     {month}
                     {doi}
                     {isbn} .'''
    f = open("pubs.ttl", "a")
    f.write(str)
    f.close()


############################# insert proceedings ###########################
for tag in root.findall('proceedings'):
    idPub = tag.get('id')
    parsedID = idPub.replace('-', '_')
    doi = ''
    address = ''
    publisher = ''
    edithorRefs = []
    edithors = []
    er = ''
    isbn = ''
    e = ''
    booktitle = ''
    year = ''
    month = ''

    for tag2 in tag:
        if tag2.tag == 'editor':
            editor = tag2.get('id')
            e += f''':editadoPor :{editor} ;\n\t\t     '''
            e+= '\n'
            if (editor, tag2.text) not in editorNames:
                editorNames.append((editor, tag2.text))

        if tag2.tag == 'editor-ref':
            er += f''':temEditorRef :{tag2.get('authorid')} ;\n\t\t     '''

        if tag2.tag == 'title':
            title = f''':title "{tag2.text}" ;'''

        if tag2.tag == 'booktitle':
            booktitle = f''':booktitle "{tag2.text}" ;'''

        if tag2.tag == 'address':
            address = f''':address "{tag2.text}" ;'''

        if tag2.tag == 'year':
            year = f''':year {tag2.text} ;'''
 
        if tag2.tag == 'month':
            month = f''':month "{tag2.text}" ;'''

        if tag2.tag == 'doi':
            doi = f''':doi "{tag2.text}" ;'''

        if tag2.tag == 'isbn':
            isbn = f''':isbn "{tag2.text}" ;'''

        if tag2.tag == 'publisher':
            publisher = f''':publisher "{tag2.text}" ;'''       

    str = f'''### http://www.semanticweb.org/antóniocarvalho/ontologies/pubs#{parsedID}
              :{parsedID} rdf:type owl:NamedIndividual ,
                              :Publication , 
                              :Proceeding ;
                     {e}
                     {er}        
                     {address}
                     {publisher}
                     {title}
                     {booktitle}
                     {year}
                     {month}
                     {doi}
                     {isbn} .
            '''
    f = open("pubs.ttl", "a")
    f.write(str)
    f.close() 

######################### insert article #########################################
for tag in root.findall('article'):
    idPub = tag.get('id')
    parsedID = idPub.replace('-', '_')
    doi = ''
    address = ''
    publisher = ''
    journal = ''
    volume = ''
    issn = ''
    authorRefs = []
    authors = []
    ar = ''
    isbn = ''
    a = ''
    booktitle = ''
    year = ''
    month = ''
    number = ''
    uri = ''
    deliverables = ''

    for tag2 in tag:
        if tag2.tag == 'author':
            author = tag2.get('id')
            a += f''':temAutor :{author} ;\n\t\t     '''
            a+= '\n'
            if (author, tag2.text) not in authorNames:
                authorNames.append((author, tag2.text))

        if tag2.tag == 'author-ref':
            ar += f''':temAutorRef :{tag2.get('authorid')} ;\n\t\t     '''

        if tag2.tag == 'title':
            title = f''':title "{tag2.text}" ;'''

        if tag2.tag == 'booktitle':
            booktitle = f''':booktitle "{tag2.text}" ;'''

        if tag2.tag == 'address':
            address = f''':address "{tag2.text}" ;'''

        if tag2.tag == 'year':
            year = f''':year {tag2.text} ;'''
 
        if tag2.tag == 'month':
            month = f''':month "{tag2.text}" ;'''

        if tag2.tag == 'doi':
            doi = f''':doi "{tag2.text}" ;'''

        if tag2.tag == 'isbn':
            isbn = f''':isbn "{tag2.text}" ;'''

        if tag2.tag == 'issn':
            issn = f''':issn "{tag2.text}" ;'''

        if tag2.tag == 'uri':
            uri = f''':uri "{tag2.text}" ;'''

        if tag2.tag == 'number':
            number = f''':number {tag2.text} ;'''

        if tag2.tag == 'journal':
            journal = f''':journal "{tag2.text}" ;'''

        if tag2.tag == 'volume':
            volume = f''':volume "{tag2.text}" ;'''

        if tag2.tag == 'deliverables':
            for tag3 in tag2:
                d = tag3.get('url')
                isbn = f''':deliverables "{d}" ;'''

        if tag2.tag == 'publisher':
            publisher = f''':publisher "{tag2.text}" ;'''                                          

    str = f'''### http://www.semanticweb.org/antóniocarvalho/ontologies/pubs#{parsedID}
              :{parsedID} rdf:type owl:NamedIndividual ,
                              :Publication , 
                              :Article ;
                     {a}
                     {ar}        
                     {address}
                     {publisher}
                     {title}
                     {booktitle}
                     {year}
                     {month}
                     {doi}
                     {isbn}
                     {uri}
                     {journal}
                     {number}
                     {volume}
                     {deliverables}
                     {issn} .
            '''
    f = open("pubs.ttl", "a")
    f.write(str)
    f.close() 

######################## insert book ##############################
for tag in root.findall('book'):
    idPub = tag.get('id')
    parsedID = idPub.replace('-', '_')
    doi = ''
    address = ''
    publisher = ''
    journal = ''
    volume = ''
    issn = ''
    authorRefs = []
    authors = []
    ar = ''
    isbn = ''
    a = ''
    booktitle = ''
    year = ''
    month = ''
    number = ''
    uri = ''
    deliverables = ''

    for tag2 in tag:
        if tag2.tag == 'author':
            author = tag2.get('id')
            a += f''':temAutor :{author} ;\n\t\t     '''
            a+= '\n'
            if (author, tag2.text) not in authorNames:
                authorNames.append((author, tag2.text))

        if tag2.tag == 'author-ref':
            ar += f''':temAutorRef :{tag2.get('authorid')} ;\n\t\t     '''

        if tag2.tag == 'title':
            title = f''':title "{tag2.text}" ;'''

        if tag2.tag == 'booktitle':
            booktitle = f''':booktitle "{tag2.text}" ;'''

        if tag2.tag == 'address':
            address = f''':address "{tag2.text}" ;'''

        if tag2.tag == 'year':
            year = f''':year {tag2.text} ;'''
 
        if tag2.tag == 'month':
            month = f''':month "{tag2.text}" ;'''

        if tag2.tag == 'doi':
            doi = f''':doi "{tag2.text}" ;'''

        if tag2.tag == 'isbn':
            isbn = f''':isbn "{tag2.text}" ;'''

        if tag2.tag == 'issn':
            issn = f''':issn "{tag2.text}" ;'''

        if tag2.tag == 'uri':
            uri = f''':uri "{tag2.text}" ;'''

        if tag2.tag == 'number':
            number = f''':number {tag2.text} ;'''

        if tag2.tag == 'journal':
            journal = f''':journal "{tag2.text}" ;'''

        if tag2.tag == 'volume':
            volume = f''':volume "{tag2.text}" ;'''

        if tag2.tag == 'deliverables':
            for tag3 in tag2:
                d = tag3.get('url')
                isbn = f''':deliverables "{d}" ;'''

        if tag2.tag == 'publisher':
            publisher = f''':publisher "{tag2.text}" ;'''                                          

    str = f'''### http://www.semanticweb.org/antóniocarvalho/ontologies/pubs#{parsedID}
              :{parsedID} rdf:type owl:NamedIndividual ,
                              :Publication , 
                              :Book ;
                     {a}
                     {ar}        
                     {address}
                     {publisher}
                     {title}
                     {booktitle}
                     {year}
                     {month}
                     {doi}
                     {isbn}
                     {uri}
                     {journal}
                     {number}
                     {volume}
                     {deliverables}
                     {issn} .
            '''   
    f = open("pubs.ttl", "a")
    f.write(str)
    f.close() 

######################## insert inbook #####################################
for tag in root.findall('inbook'):
    idPub = tag.get('id')
    parsedID = idPub.replace('-', '_')
    doi = ''
    address = ''
    publisher = ''
    journal = ''
    volume = ''
    issn = ''
    authorRefs = []
    authors = []
    ar = ''
    isbn = ''
    a = ''
    e = ''
    er = ''
    booktitle = ''
    year = ''
    month = ''
    number = ''
    uri = ''
    deliverables = ''
    chapter = ''
    pages = ''

    for tag2 in tag:

        if tag2.tag == 'editor':
            editor = tag2.get('id')
            e += f''':editadoPor :{editor} ;\n\t\t     '''
            e+= '\n'
            if (editor, tag2.text) not in editorNames:
                editorNames.append((editor, tag2.text))

        if tag2.tag == 'editor-ref':
            er += f''':temEditorRef :{tag2.get('authorid')} ;\n\t\t     '''

        if tag2.tag == 'author':
            author = tag2.get('id')
            a += f''':temAutor :{author} ;\n\t\t     '''
            a+= '\n'
            if (author, tag2.text) not in authorNames:
                authorNames.append((author, tag2.text))

        if tag2.tag == 'author-ref':
            ar += f''':temAutorRef :{tag2.get('authorid')} ;\n\t\t     '''

        if tag2.tag == 'title':
            title = f''':title "{tag2.text}" ;'''

        if tag2.tag == 'booktitle':
            booktitle = f''':booktitle "{tag2.text}" ;'''

        if tag2.tag == 'address':
            address = f''':address "{tag2.text}" ;'''

        if tag2.tag == 'year':
            year = f''':year {tag2.text} ;'''
 
        if tag2.tag == 'month':
            month = f''':month "{tag2.text}" ;'''

        if tag2.tag == 'doi':
            doi = f''':doi "{tag2.text}" ;'''

        if tag2.tag == 'isbn':
            isbn = f''':isbn "{tag2.text}" ;'''

        if tag2.tag == 'issn':
            issn = f''':issn "{tag2.text}" ;'''

        if tag2.tag == 'uri':
            uri = f''':uri "{tag2.text}" ;'''

        if tag2.tag == 'number':
            number = f''':number {tag2.text} ;'''

        if tag2.tag == 'journal':
            journal = f''':journal "{tag2.text}" ;'''

        if tag2.tag == 'volume':
            volume = f''':volume "{tag2.text}" ;'''

        if tag2.tag == 'deliverables':
            for tag3 in tag2:
                d = tag3.get('url')
                isbn = f''':deliverables "{d}" ;'''

        if tag2.tag == 'publisher':
            publisher = f''':publisher "{tag2.text}" ;'''

        if tag2.tag == 'pages':
            pages = f''':pages "{tag2.text}" ;'''      

        if tag2.tag == 'chapter':
            chapter = f''':chapter "{tag2.text}" ;'''                                            

    str = f'''### http://www.semanticweb.org/antóniocarvalho/ontologies/pubs#{parsedID}
              :{parsedID} rdf:type owl:NamedIndividual ,
                              :Publication , 
                              :InBook ;
                     {a}
                     {e}
                     {ar}
                     {er}        
                     {address}
                     {publisher}
                     {title}
                     {booktitle}
                     {year}
                     {month}
                     {doi}
                     {isbn}
                     {uri}
                     {journal}
                     {number}
                     {volume}
                     {deliverables}
                     {issn}
                     {pages}
                     {chapter} .
            '''
    f = open("pubs.ttl", "a")
    f.write(str)
    f.close() 

#insert misc
for tag in root.findall('misc'):
    idPub = tag.get('id')
    parsedID = idPub.replace('-', '_')
    doi = ''
    address = ''
    publisher = ''
    journal = ''
    volume = ''
    issn = ''
    authorRefs = []
    authors = []
    ar = ''
    isbn = ''
    a = ''
    e = ''
    er = ''
    booktitle = ''
    year = ''
    month = ''
    number = ''
    uri = ''
    deliverables = ''
    chapter = ''
    pages = ''
    howpublished = ''

    for tag2 in tag:

        if tag2.tag == 'editor':
            editor = tag2.get('id')
            e += f''':editadoPor :{editor} ;\n\t\t     '''
            e+= '\n'
            if (editor, tag2.text) not in editorNames:
                editorNames.append((editor, tag2.text))

        if tag2.tag == 'editor-ref':
            er += f''':temEditorRef :{tag2.get('authorid')} ;\n\t\t     '''

        if tag2.tag == 'author':
            author = tag2.get('id')
            a += f''':temAutor :{author} ;\n\t\t     '''
            a+= '\n'
            if (author, tag2.text) not in authorNames:
                authorNames.append((author, tag2.text))

        if tag2.tag == 'author-ref':
            ar += f''':temAutorRef :{tag2.get('authorid')} ;\n\t\t     '''

        if tag2.tag == 'title':
            title = f''':title "{tag2.text}" ;'''

        if tag2.tag == 'booktitle':
            booktitle = f''':booktitle "{tag2.text}" ;'''

        if tag2.tag == 'address':
            address = f''':address "{tag2.text}" ;'''

        if tag2.tag == 'year':
            year = f''':year {tag2.text} ;'''
 
        if tag2.tag == 'month':
            month = f''':month "{tag2.text}" ;'''

        if tag2.tag == 'doi':
            doi = f''':doi "{tag2.text}" ;'''

        if tag2.tag == 'isbn':
            isbn = f''':isbn "{tag2.text}" ;'''

        if tag2.tag == 'issn':
            issn = f''':issn "{tag2.text}" ;'''

        if tag2.tag == 'uri':
            uri = f''':uri "{tag2.text}" ;'''

        if tag2.tag == 'number':
            number = f''':number {tag2.text} ;'''

        if tag2.tag == 'journal':
            journal = f''':journal "{tag2.text}" ;'''

        if tag2.tag == 'volume':
            volume = f''':volume "{tag2.text}" ;'''

        if tag2.tag == 'deliverables':
            for tag3 in tag2:
                d = tag3.get('url')
                isbn = f''':deliverables "{d}" ;'''

        if tag2.tag == 'publisher':
            publisher = f''':publisher "{tag2.text}" ;'''

        if tag2.tag == 'pages':
            pages = f''':pages {tag2.text} ;'''      

        if tag2.tag == 'chapter':
            chapter = f''':chapter "{tag2.text}" ;'''

        if tag2.tag == 'howpublished':
            howpublished = f''':howpublished "{tag2.text}" ;'''                                                 

    str = f'''### http://www.semanticweb.org/antóniocarvalho/ontologies/pubs#{parsedID}
              :{parsedID} rdf:type owl:NamedIndividual ,
                              :Publication , 
                              :Misc ;
                     {a}
                     {e}
                     {ar}
                     {er}        
                     {address}
                     {publisher}
                     {title}
                     {howpublished}
                     {booktitle}
                     {year}
                     {month}
                     {doi}
                     {isbn}
                     {uri}
                     {journal}
                     {number}
                     {volume}
                     {deliverables}
                     {issn}
                     {pages}
                     {chapter} .
            '''
    f = open("pubs.ttl", "a")
    f.write(str)
    f.close()        

#insert authors
for (id, aut) in authorNames:           
    autStr = f''' 
    ###  http://www.semanticweb.org/antóniocarvalho/ontologies/pubs#{id}
    :{id} rdf:type owl:NamedIndividual ,
                   :Author ;
          :name "{aut}" .
    '''
    f = open("pubs.ttl", "a")
    f.write(autStr)
    f.close() 

#insert editors
for (id, ed) in editorNames:           
    edStr = f''' 
    ###  http://www.semanticweb.org/antóniocarvalho/ontologies/pubs#{id}
    :{id} rdf:type owl:NamedIndividual ,
                   :Editor ;
          :name "{ed}" .
    '''    

    f = open("pubs.ttl", "a")
    f.write(edStr)
    f.close()
       
