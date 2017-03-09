#!/bin/sh

if [[ -d /var/lib/mysql &&  "$(ls -A /var/lib/mysql)" ]]; then
    echo "Using existing db"
else
    echo "No existing database found, building database"
    chown mysql.mysql /var/lib/mysql
    service mysql start
    mysql < /bin/schema.sql
    service mysql stop
fi

exec mysqld --user=root