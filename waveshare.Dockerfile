FROM node:25

USER root

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apt-get update && apt-get install -y \
  chromium \
  libgbm1 \
  libxshmfence1 \
  libasound2 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libdrm2 \
  libxkbcommon0 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libgconf-2-4 \
  libnss3 \
  libxss1 \
  fonts-liberation \
  xdg-utils

RUN apt-get update \
  && apt-get install -y python3 python3-pip python3-dev python3-venv python3-smbus python3-setuptools  
# RUN python3-rpi-lgpio && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app \
    && chown -R node:node /app

USER node

COPY ./package.json /app/
RUN cd /app/ && npm install

COPY ./index.js /app/
COPY ./config.js /app/

## Create a python virtual environment
## and install necessary libs
RUN python3 -m venv /app/waveshare
ENV PATH="/app/waveshare/bin:$PATH"

RUN pip3 install waveshare-epaper

# RUN . /app/waveshare/bin/activate

COPY waveshare.py /app/waveshare

ENTRYPOINT [ "/usr/local/bin/node", "/app/index.js" ]