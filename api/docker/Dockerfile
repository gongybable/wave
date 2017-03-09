FROM node

RUN apt-get update -y && apt-get install -y rsync

# entrypoint definition section
COPY docker/entrypoint-api.sh /bin/entrypoint-api.sh
RUN chmod +x /bin/entrypoint-api.sh
ENTRYPOINT ["/bin/entrypoint-api.sh"]

ENV SRC_DIR /src
ENV DEST_DIR /opt/wave/api

RUN mkdir -p ${DEST_DIR} &&\
    mkdir -p ${SRC_DIR} &&\
    mkdir -p /uploads