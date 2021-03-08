<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xd="oxygenxml.com/ns/doc/xsl"
    exclude-result-prefixes="xd"
    version="1.0">
    
    <xd:doc scope="stylesheet">
        
        <xd:desc>
            
            <xd:p><xd:b>Created on:</xd:b> Mar 2, 2021</xd:p>
            
            <xd:p><xd:b>Author: António Lindo</xd:b> jcr</xd:p>
            
            <xd:p>Conversão do mapa de XML para TTL</xd:p>
            
        </xd:desc>
        
    </xd:doc>
    
    <xsl:output method="text" encoding="UTF-8" indent="yes"/>
    
   
   
   
    <xsl:template match="obra">
        
        
        ### http://www.semanticweb.org/antóniocarvalho/ontologies/musica#<xsl:value-of select="compositor"/>
        
        :<xsl:value-of select="compositor"/> rdf:type owl:NamedIndividual .
        
        
        ###  http://www.semanticweb.org/antóniocarvalho/ontologies/musica#<xsl:value-of select="@id"/>
        
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        
        :Obra ;
        
        :titulo "<xsl:value-of select="titulo"/>" ;
        
        :tipo "<xsl:value-of select="tipo"/>" ;
        
        :compostaPor :"<xsl:value-of select="compositor"/>" .
                          
        # -------------------------------------------
        <xsl:apply-templates select="instrumentos"/>
        
        
    </xsl:template>

    <xsl:template match="instrumentos">
        <xsl:apply-templates select="instrumento"/>        
    </xsl:template>
    
    <xsl:template match="instrumento">
        
        ### http://www.semanticweb.org/antóniocarvalho/ontologies/musica#<xsl:value-of select="designacao"/>-<xsl:value-of select="partitura/@path"/>
        
        :<xsl:value-of select="designacao"/> rdf:type owl:NamedIndividual ;
        
        :utilizadoEm : <xsl:value-of select="../../@id"/> ;
        
        :utiliza :<xsl:value-of select="partitura/@path"/> .
        
        # --------------------------------------------------

        ### http://www.semanticweb.org/antóniocarvalho/ontologies/musica#<xsl:value-of select="partitura/@path"/>
        
        :<xsl:value-of select="partitura/@path"/> rdf:type owl:NamedIndividual ;
        
        :voz <xsl:value-of select="partitura/@voz"/> ;
        
        :type <xsl:value-of select="partitura/@type"/> .
        
        # --------------------------------------------------
    </xsl:template>
    
 
    

    

    
    
    
    
    
 
   
    
   
</xsl:stylesheet>