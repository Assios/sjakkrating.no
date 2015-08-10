#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import urllib2
import unicodedata
import codecs

class RatingObject:
    def __init__(self, line):

        s = line.split(';')
        self.nsf_id = to_int(s[0])
        self.full_name = str(s[1])
        self.surname = s[1].split(' ')[0]
        self.first_name = ' '.join(s[1].split(' ')[1:])
        self.gender = s[2]
        self.club = s[3]
        self.elo = to_int(s[4])
        self.number_of_games = to_int(s[5])
        self.GP_class = s[6]
        self.year_of_birth = to_int(s[7])
        self.fide_id = to_int(s[8])
        self.last_membership_nsf = to_int(s[9])

url = urllib2.unquote("http://www.sjakk.no/rating/siste.txt")

def to_int(n):
    if n.isdigit():
        return int(n)
    else:
        return 0

def swap(char):
    swap = {
        129: 'Æ',
        132: 'ä',
        133: 'à',
        134: 'å',
        140: 'î',
        143: 'Å',
        145: 'æ',
        148: 'ö',
        155: 'ø',
        157: 'Ø',
    }

    return swap.get(ord(char)) or ''

lines = [''.join([i if ord(i)<128 else swap(i) for i in line]).\
        decode('utf-8').encode('latin-1') for line in urllib2.urlopen(url)]

date = ''.join(lines.pop(0).split())
players = []

players = [RatingObject(line) for line in lines]

p = {}
p[date] = [player.__dict__ for player in players]

response = json.dumps(p, indent=4, ensure_ascii=False)

if __name__=="__main__":
    print response
