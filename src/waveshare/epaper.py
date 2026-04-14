import logging
import epaper

from PIL import Image
# from PIL import ImageDraw
# from PIL import ImageFont

logging.basicConfig(level=logging.DEBUG)

def main():
    epd = epaper.epaper('epd7in5_V2').EPD();
    
    logging.info("init and Clear")
    epd.init()
    epd.Clear()

    Himage = Image.new('1', (epd.width, epd.height), 255)  # 255: clear the frame
    Other = Image.new('1', (epd.width, epd.height), 255)  # 255: clear the frame

    # is to be run by parent directory, which requires ..
    image = Image.open('/app/screenshot.png')
    #epd.display(epd.getbuffer(image),epd.getbuffer(Other))
    epd.display(epd.getbuffer(image))

if __name__ == '__main__':
    main()
