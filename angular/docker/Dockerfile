FROM    nginx

# entrypoint definition section
COPY docker/entrypoint-angular.sh /bin/entrypoint-angular.sh
RUN chmod +x /bin/entrypoint-angular.sh
ENTRYPOINT ["/bin/entrypoint-angular.sh"]

RUN apt-get update -y && apt-get install -y rsync