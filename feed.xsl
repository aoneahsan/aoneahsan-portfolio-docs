<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html><head><title><xsl:value-of select="rss/channel/title"/></title><style>body{font-family:system-ui,sans-serif;max-width:48rem;margin:3rem auto;padding:0 1rem;background:#110b06;color:#f5eee1}a{color:#f19600}li{margin:1.5rem 0}</style></head>
    <body><h1><xsl:value-of select="rss/channel/title"/></h1><p><xsl:value-of select="rss/channel/description"/></p><ul><xsl:for-each select="rss/channel/item"><li><a href="{link}"><xsl:value-of select="title"/></a><p><xsl:value-of select="description"/></p></li></xsl:for-each></ul></body></html>
  </xsl:template>
</xsl:stylesheet>
