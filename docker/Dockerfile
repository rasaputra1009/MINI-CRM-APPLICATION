FROM ubuntu

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install software-properties-common -y
RUN add-apt-repository ppa:ondrej/php
RUN apt update && apt-get upgrade -y
RUN apt-get install -y php7.3
RUN update-alternatives --set php /usr/bin/php7.3
RUN apt-get install -y unixodbc-dev php7.3-mbstring php7.3-sybase php7.3-bcmath php7.3-curl php7.3-json php-xml php7.3-xml php7.3-tokenizer composer php7.3-zip redis-server php7.3-dev php-pear libmcrypt-dev libreadline-dev php7.3-redis && pecl install pdo_sqlsrv sqlsrv mcrypt-1.0.2
RUN add-apt-repository "deb http://archive.ubuntu.com/ubuntu focal universe"

# Install ODBC driver
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get update
RUN ACCEPT_EULA=Y apt-get install -y msodbcsql17


RUN printf "; priority=20\nextension=sqlsrv.so\n" > /etc/php/7.3/mods-available/sqlsrv.ini && printf "; priority=30\nextension=pdo_sqlsrv.so\n" > /etc/php/7.3/mods-available/pdo_sqlsrv.ini && phpenmod sqlsrv pdo_sqlsrv

RUN printf "extension=mcrypt.so\nextension=redis.so" > /etc/php/7.3/apache2/php.ini

ADD ./docker/laravel-react-boilerplate.conf /etc/apache2/sites-available/laravel-react-boilerplate.conf

ADD ./docker/ports.conf /etc/apache2/ports.conf

RUN echo '\n[172.16.185.33] \n\
host = 172.16.185.33 \n\
port = 1433 \n\
tds version = 7.0 \n' >> /etc/freetds/freetds.conf

RUN ln -sf /dev/stdout /var/log/apache2/access.log && ln -sf /dev/stdout /var/log/apache2/error.log

RUN a2enmod rewrite headers && rm /etc/apache2/sites-available/000-default.conf && a2ensite laravel-react-boilerplate.conf

EXPOSE 8880

CMD nohup redis-server & apachectl -D FOREGROUND
