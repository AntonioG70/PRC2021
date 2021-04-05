 <xsl:template match="instrumento">
        
        ### http://www.semanticweb.org/antóniocarvalho/ontologies/musica#<xsl:value-of select="designacao"/>
        
        :<xsl:value-of select="designacao"/> rdf:type owl:NamedIndividual ;
        
        :utiliza :<xsl:value-of select="partitura/@path"/> .
        
        # --------------------------------------------------
    <xsl:apply-templates/>   
    </xsl:template>
    
    <xsl:template match="partitura">
        
        ### http://www.semanticweb.org/antóniocarvalho/ontologies/musica#<xsl:value-of select="path"/>
        
        :<xsl:value-of select="path"/> rdf:type owl:NamedIndividual ;
        
        :voz <xsl:value-of select="voz"/> ;
        
        :type <xsl:value-of select="type"/> .
        
        # --------------------------------------------------
     <xsl:apply-templates/>   
    </xsl:template>

    
    
        ### http://www.semanticweb.org/antóniocarvalho/ontologies/musica#<xsl:value-of select="compositor"/>
        
        :<xsl:value-of select="path"/> rdf:type owl:NamedIndividual ;

        :compos :<xsl:template match="obra">
        
        ###  http://www.semanticweb.org/antóniocarvalho/ontologies/untitled-ontology-19#<xsl:value-of select="@id"/>
        
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        
        :Obra ;
        
        :titulo "<xsl:value-of select="titulo"/>" ;
        
        :tipo "<xsl:value-of select="tipo"/>" ;

        :constituidaPor <xsl:value-of select="instrumentos/intrumento/designacao"/>
        
        :compostaPor :"<xsl:value-of select="compositor"/>" .
        
        # -------------------------------------------
    <xsl:apply-templates/>
    </xsl:template>
    