import sys
import logging
import epaper

from PIL import Image
# from PIL import ImageDraw
# from PIL import ImageFont

logging.basicConfig(level=logging.DEBUG)

def main():
    if len(sys.argv) < 2:
        raise ValueError('Argument displaytype missing')    

    displaytype = sys.argv[1]
    epd = epaper.epaper(displaytype).EPD()
    
    logging.info("init and Clear")
    epd.init()
    epd.Clear()

    Himage = Image.new('1', (epd.width, epd.height), 255)  # 255: clear the frame

    # is to be run by parent directory, which requires ..
    image = Image.open('/app/static/screenshot.png')
    epd.display(epd.getbuffer(image),epd.getbuffer(Himage))

if __name__ == '__main__':
    main()
