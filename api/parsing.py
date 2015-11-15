#!/usr/bin/env python
# -*- coding: utf-8 -*-

import re
import json
import urllib2
import unicodedata
import codecs
from rating import *

def to_int(n):
    if n.isdigit():
        return int(n)
    else:
        return 0

def last_element_if_exists(n):
    if n:
        if n[-1]:
            return n[-1]
    return 0

class RatingObject:
    def __init__(self, line):

        s = line.split(';')
        self.nsf_id = to_int(s[0])
        self.full_name = str(s[1])
        self.surname = s[1].split(' ')[0]
        self.first_name = ' '.join(s[1].split(' ')[1:])
        self.gender = s[2]
        self.club = s[3]
        self.club_lc = self.club.lower()
        self.number_of_games = to_int(s[5])
        self.GP_class = s[6]
        self.year_of_birth = to_int(s[7])
        self.fide_id = to_int(s[8])
        self.elo = to_int(s[11])
        self.nsf_categories, self.nsf_elos, self.fide_elos, self.rapid_elos, self.blitz_elos, self.games = get_ratings_by_name(self.full_name)
        self.nsf_elo = last_element_if_exists(self.nsf_elos)
        self.fide_elo = last_element_if_exists(self.fide_elos)
        self.rapid_elo = last_element_if_exists(self.rapid_elos)
        self.blitz_elo = last_element_if_exists(self.blitz_elos)
        self.country, self.fide_standard, self.fide_rapid, self.fide_blitz, self.fide_title = get_fide_rating(self.fide_id)

	self.name = self.first_name + ' ' + self.surname

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

row = 0
for line in original_lines:
        fields = line.split(";")
        fields[11] = decrypt(row, fields[11])
        decrypted_lines.append(";".join(fields))
        row += 1

lines = [''.join([i if ord(i)<128 else swap(i) for i in line]) for line in decrypted_lines]

players = [RatingObject(line) for line in lines]

all_ratings = [p.nsf_elo for p in players]

p = sorted(players, key=lambda x: x.elo, reverse=True)

response = {}
response[date] = [a.__dict__ for a in p if a.elo!=0]

if __name__=="__main__":
    print response
