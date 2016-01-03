#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import chess.pgn
import re
import sys
import urllib2

class RatingObject:
  def __init__(self, line):
      s = line.split(';')
      self.nsf_id = s[0]
      self.surname = s[1].split(' ')[0]
      self.first_name = ' '.join(s[1].split(' ')[1:])
      self.only_first_name = s[1].split(' ')[1]

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

lines = [''.join([i if ord(i)<128 else swap(i) for i in line]) for line in urllib2.urlopen(url)][1:]

players = [RatingObject(line) for line in lines]

if len(sys.argv) > 1:
  for pgn_file in sys.argv[1:]:
    if pgn_file[-4:]==".pgn":
      pgn_file = pgn_file[:-4]

    try:
      pgn = open(pgn_file + '.pgn')
    except:
      print "No file named " + pgn_file + ".pgn"
      continue

    print "Converting " + pgn_file + ".pgn to json..."

    json_file = open(pgn_file + '.json', 'a')

    node = chess.pgn.read_game(pgn)

    while node != None:

      data =  node.headers

      try:
        if (", " in re.sub("\(.*?\)", "", data["White"]).strip() and ", " in re.sub("\(.*?\)", "", data["Black"]).strip()):
            for color in ["White", "Black"]:
                    data[color + "Surname"], data[color + "FirstName"] = [i.split()[0] for i in data.get(color).split(", ")]
        elif len(data["White"].split()) > 1:
            for color in ["White", "Black"]:
                    data[color + "FirstName"], data[color + "Surname"] = [i.split()[0] for i in data.get(color).split(" ")]
      except:
        continue

      for player in players:
        if ((player.only_first_name.lower() == data["WhiteFirstName"].lower()) and (player.surname.lower() == data["WhiteSurname"].lower())):
          data["WhiteId"] = player.nsf_id
        if ((player.only_first_name.lower() == data["BlackFirstName"].lower()) and (player.surname.lower() == data["BlackSurname"].lower())):
          data["BlackId"] = player.nsf_id

      data["moves"] = []

      while node.variations:
        next_node = node.variation(0)
        data["moves"].append(re.sub("\{.*?\}", "", node.board().san(next_node.move)))
        node = next_node
      node = chess.pgn.read_game(pgn)
      json.dump(data, json_file, encoding='latin1')
      json_file.write('\n')

    json_file.close()
else:
  print("You need to pass in at least one pgn file.")
