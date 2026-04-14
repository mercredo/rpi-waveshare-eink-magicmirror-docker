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

## https://www.waveshare.com/wiki/7.5inch_e-Paper_HAT_Manual
RUN apt-get update \
  && apt-get install -y python3 python3-pip python3-pil python3-numpy python3-dev python3-venv \
    python3-spidev python3-gpiozero python3-smbus python3-setuptools
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

COPY ./src /app
RUN mkdir -p /app/static \
    && chown -R node:node /app

# USER node

RUN cd /app/ && npm install

## Create a python virtual environment
## and install necessary libs
RUN python3 -m venv /app/waveshare
ENV PATH="/app/waveshare/bin:$PATH"

RUN pip3 install spidev gpiozero rpi-lgpio waveshare-epaper pillow

# COPY ./src/waveshare/epaper.py /app/waveshare

ENTRYPOINT [ "/usr/local/bin/node", "/app/index.js" ]