#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pymongo
from pymongo import MongoClient
import re
import json
import urllib2
import unicodedata
import codecs
import numpy as np

client = MongoClient('mongodb://127.0.0.1:3001/meteor')

db = client.meteor

url = urllib2.unquote("http://www.sjakk.no/rating/siste.txt")

def to_int(n):
    if n.isdigit():
        return int(n)
    else:
        return 0

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

all_ids = [to_int(l.split(";")[0]) for l in lines]

def update_unofficial_rating(nsf_id):
    current = None
    day, month, year = date.split("/")
    day = int(day)
    month = int(month)
    year = int("20" + year)

    l = [l.split(";") for l in lines]

    for line in l:
        if nsf_id == to_int(line[0]):
            current = line

    if not current:
        return False

    elo = to_int(current[11])

    mongo_player = db.players.find_one({
        "nsf_id": nsf_id
    })

    if not mongo_player:
        return False

    if not mongo_player.get("elos"):
        db.players.update({
            "nsf_id": nsf_id
        }, {
            "$set": {
                "elos": [[[year, month, day], elo]]
            }
        })
        return True

    mongo_player = db.players.find_one({
        "nsf_id": nsf_id
    })

    current_elos = mongo_player.get("elos")
    current_elos.append([[year, month, day], elo])
    nsf = mongo_player.get("nsf_elo")

    if (elo == mongo_player.get("elo")):
        return mongo_player
    else:
        db.players.update({
            "nsf_id": nsf_id
        }, {
            "$set": {
                "elo": elo,
                "elos": current_elos,
                "diff": elo-nsf
            }
        })
        return mongo_player



for _id in all_ids:
    update_unofficial_rating(_id)
