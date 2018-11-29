#!/bin/bash
FINAL="/usr/local/apache2/htdocs/$HTTPPATH"
echo moving data to $FINAL
mkdir -p $FINAL
mv /payload/* $FINAL
httpd-foreground
