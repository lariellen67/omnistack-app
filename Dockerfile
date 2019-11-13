FROM alpine


LABEL maintainer="Larissa Marques<larissa.marques@stitdata.com>"


RUN mkdir /var/www
RUN echo "teste" > /var/www/arquivo.txt


VOLUME /var/www

EXPOSE 80 443


WORKDIR /var/www
