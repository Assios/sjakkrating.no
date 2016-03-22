#!/usr/bin/env python
# -*- coding: utf-8 -*-

import tornado.escape
import tornado.ioloop
import tornado.web
import numpy as np
import urllib2
import re
import json

def to_int(n):
    if n.isdigit():
        return int(n)
    else:
        return 0

class RatingObject:
    def __init__(self, line):
        s = line.split(';')
        self.nsf_id = to_int(s[0])
        self.fide_id = to_int(s[8])
        self.elo = [(year, month, day), to_int(s[11])]

url = urllib2.unquote("http://www.sjakk.no/rating/siste.txt")

def swap(char):
    swap = {
        129: 'ü',
        132: 'ä',
        133: 'à',
        134: 'å',
        140: 'î',
        143: 'Å',
        145: 'æ',
        146: 'Æ',
        148: 'ö',
        155: 'ø',
        157: 'Ø',
    }

    return swap.get(ord(char)) or ''

def decrypt(row, cipher):
    """
    Thanks to https://www.reddit.com/r/GoForGold/comments/3k7z3s/gold_for_anyone_who_can_help_me_recognize_andor/cv1qj3o
    """
    plain = ""
    seed = ((row * 0x1E2F) + 0xFE64) & 0xFFFFFFFF
    for byte in bytearray.fromhex(cipher):
            mask = (seed >> 8) & 0xFF
            plain += chr(byte ^ mask)
            seed = (((seed + byte) * 0x0E6C9AA0) + 0x196AAA91) & 0xFFFFFFFF
    plain = re.sub("[^0-9]", "", plain)
    return plain

decrypted_lines = []
original_lines = [line for line in urllib2.urlopen(url)]
date = ''.join(original_lines.pop(0).split())

day, month, year = date.split("/")
year = int("20" + year)
day = int(day)
month = int(month)

row = 0
for line in original_lines:
        fields = line.split(";")
        fields[11] = decrypt(row, fields[11])
        decrypted_lines.append(";".join(fields))
        row += 1

lines = [''.join([i if ord(i)<128 else swap(i) for i in line]) for line in decrypted_lines]

players = [RatingObject(line) for line in lines]

response = {}
response[date] = [a.__dict__ for a in players if a.elo!=0]

class PostHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')

        self.write(json.dumps(response, indent=4, ensure_ascii=False))   

application = tornado.web.Application([
    (r"/", PostHandler),
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
