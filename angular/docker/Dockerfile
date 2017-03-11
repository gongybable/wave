FROM    nginx

# entrypoint definition section
COPY docker/entrypoint-angular.sh /bin/entrypoint-angular.sh
RUN chmod +x /bin/entrypoint-angular.sh
ENTRYPOINT ["/bin/entrypoint-angular.sh"]

ENV SRC_DIR /src
ENV DEST_DIR /dist

RUN mkdir -p ${DEST_DIR} &&\
    mkdir -p ${SRC_DIR}