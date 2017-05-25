FROM ubuntu:latest

# see: http://stackoverflow.com/questions/20635472/using-the-run-instruction-in-a-dockerfile-with-source-does-not-work
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
# disable stdin to avoid 'dpkg-preconfigure: unable to re-open stdin'
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN apt-get update -y
RUN apt-get install build-essential libssl-dev -y
RUN apt-get install curl -y

# nvm and node version
ENV NVM_VERSION 0.33.2
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 7.10.0
# install nvm an node
RUN curl https://raw.githubusercontent.com/creationix/nvm/v$NVM_VERSION/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/v$NODE_VERSION/bin:$PATH

#COPY . /usr/admin/FundManagerWeb
COPY ./package.json /usr/admin/FundManagerWeb
WORKDIR /home/admin/FundManagerWeb
#RUN mkdir .npmrc
#RUN npm config set cache /home/admin/FundManagerWeb/.npmrc --globals
RUN npm install