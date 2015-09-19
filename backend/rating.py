#!/usr/bin/env python
# -*- coding: utf-8 -*-

rating_files = ["2014jan", "2014apr", "2014jun", "2014sep", "2015jan", "2015apr", "2015jun"]

file_name = "ratingtall/" + rating_files[0] + ".txt"

f = open(file_name)

class RatingGraphObject:
    def __init__(self, line):
        self.full_name = line[6:32].strip()
        self.club = line[32:54].strip()
        self.temp_elo = line[54:61].strip().split(' ')[0]

player = RatingGraphObject(f.readlines()[5])

dictplayer = player.__dict__

dictplayer["elos"] = {}

dictplayer["elos"][rating_files[0]] = dictplayer["temp_elo"]

def get_ratings_by_name(full_name):
  elo_dict = {}
  elo_dict["elos"] = {}

  for date in rating_files:
    file_name = "ratingtall/" + date + ".txt"

    f = open(file_name)

    line = None

    for l in f.readlines():
      if full_name in l:
        line = l

    if line:
      player = RatingGraphObject(line)

      dictplayer = player.__dict__

      elo_dict["elos"][date] = dictplayer["temp_elo"]

  return elo_dict["elos"]
