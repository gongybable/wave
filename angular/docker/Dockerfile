FROM    nginx

# entrypoint definition section
COPY docker/entrypoint-angular.sh /bin/entrypoint-angular.sh
RUN chmod +x /bin/entrypoint-angular.sh
ENTRYPOINT ["/bin/entrypoint-angular.sh"]

RUN apt-get update -y &&\
	apt-get install -y curl
RUN apt-get update -y &&\
	curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash - &&\
	apt-get install -y nodejs build-essential


ENV SRC_DIR /src
ENV DEST_DIR /dist

RUN mkdir -p ${DEST_DIR} &&\
    mkdir -p ${SRC_DIR}