FROM mysql

# Entrypoint definition section
COPY docker/entrypoint-mysql.sh /bin/entrypoint-mysql.sh
RUN chmod +x /bin/entrypoint-mysql.sh
ENTRYPOINT ["/bin/entrypoint-mysql.sh"]

# Copy over schema initialization script
COPY docker/schema.sql /bin/schema.sql