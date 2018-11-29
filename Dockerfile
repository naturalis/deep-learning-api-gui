FROM httpd:2.4
MAINTAINER maarten.schermer@naturalis.nl
ENV HTTPPATH="/v1/demo"
COPY ./ /payload
RUN mv /payload/run_website.sh / \
    && chmod +x /run_website.sh
CMD ["/run_website.sh"]

