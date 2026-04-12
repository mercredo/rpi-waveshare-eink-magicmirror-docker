FROM ghcr.io/puppeteer/puppeteer:latest

USER root

RUN apt-get update \
  && apt-get install -y python3 python3-pip python3-dev python3-venv python3-smbus python3-setuptools  
# RUN python3-rpi-lgpio && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app \
    && chown -R pptruser:pptruser /app

USER pptruser

COPY ./package.json /app/
RUN cd /app/ && npm install

COPY ./index.js /app/
COPY ./config.js /app/

## Create a python virtual environment
## and install necessary libs
RUN python3 -m venv /app/waveshare
RUN cd /app/waveshare && . ./bin/activate \
  && pip3 install waveshare-epaper

COPY waveshare.py /app/waveshare

ENTRYPOINT [ "/usr/local/bin/node", "/app/index.js" ]



