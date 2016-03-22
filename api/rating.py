#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

rating_files = ["1996jan", "1996apr", "1996jun", "1996aug", "1996okt", "1996des", "1997jan", "1997apr", "1997jun", "1997sep", "1997des", "1998jan", "1998apr", "1998jun", "1998okt", "1998des", "1999jan", "1999apr", "1999jun", "1999sep", "1999des", "2000jan", "2000mai", "2000jun", "2000okt", "2001jan", "2001apr", "2001jun", "2001okt", "2002jan", "2002apr", "2002jul", "2003jan", "2003mar", "2003jun", "2003sep", "2004jan", "2004mai", "2004jun", "2004okt", "2005jan", "2005apr", "2005jun", "2005okt", "2006jan", "2006apr", "2006jun", "2006okt", "2007jan", "2007mar", "2007jun", "2007sep", "2008jan", "2008apr", "2008jun", "2008sep", "2009jan", "2009apr", "2009jun", "2009sep", "2010jan", "2010apr", "2010jun", "2010sep", "2011jan", "2011apr", "2011jun", "2011sep", "2012jan", "2012apr", "2012jun", "2012sep", "2013jan", "2013apr", "2013jun", "2013sep", "2014jan", "2014apr", "2014jun", "2014sep", "2015jan", "2015apr", "2015jun", "2015sep", "2016jan"]

class RatingGraphObject:
    def __init__(self, line):
        self.full_name = line[6:32].strip()
        self.club = line[32:54].strip()
        self.temp_elo = line[54:61].strip().split(' ')[0]
        self.fide_elo = line[64:69].strip()
        self.rapid_elo = line[69:73].strip()
        self.blitz_elo = line[74:79].strip()
        self.games = line[59:63].strip()

class FideRatingObject:
  def __init__(self, line):
    self.title = line[82:88].strip()
    self.standard = line[108:115].strip()
    self.country = line[75:80].strip()

def filename_to_date(filename):
  months = {
    "jan": 0,
    "feb": 1,
    "mar": 2,
    "apr": 3,
    "mai": 4,
    "jun": 5,
    "jul": 6,
    "aug": 7,
    "sep": 8,
    "okt": 9,
    "nov": 10,
    "des": 11,
  }

  year = int(filename[:4])
  month = months[filename[4:]]

  return (year, month)

def fide_filename_to_date(filename):
  months = {
    "jan": 0,
    "feb": 1,
    "mar": 2,
    "apr": 3,
    "may": 4,
    "jun": 5,
    "jul": 6,
    "aug": 7,
    "sep": 8,
    "oct": 9,
    "nov": 10,
    "dec": 11,
  }

  month = months[filename[:3]]

  year = int(filename[3:])

  return (year, month)


def get_fide_rating(fide_id):
  fide_dict = {}

  f = open("fide/standard_rating_list.txt")
  f_rapid = open("fide/rapid_rating_list.txt")
  f_blitz = open("fide/blitz_rating_list.txt")

  line = None

  lines = [l for l in f.readlines() if "NOR" in l]

  for l in lines:
    _id = int(l[:10].strip())
    if int(fide_id)==_id:
      line = l
      break

  if line:
    fide_dict["country"] = "NOR"
    fide_dict["title"] = line[82:88].strip()
    fide_dict["standard"] = line[108:115].strip()
  else:
    fide_dict["country"] = None
    fide_dict["title"] = None
    fide_dict["standard"] = None   

  line = None

  lines = [l for l in f_rapid.readlines() if "NOR" in l]

  for l in lines:
    _id = int(l[:10].strip())
    if int(fide_id)==_id:
      line = l
      break

  if line:
    fide_dict["rapid"] = line[108:115].strip()
  else:
    fide_dict["rapid"] = None

  line = None

  lines = [l for l in f_blitz.readlines() if "NOR" in l]

  for l in lines:
    _id = int(l[:10].strip())
    if int(fide_id)==_id:
      line = l
      break

  if line:
    fide_dict["blitz"] = line[108:115].strip()
  else:
    fide_dict["blitz"] = None

  return fide_dict["country"], fide_dict["standard"], fide_dict["rapid"], fide_dict["blitz"], fide_dict["title"]

def get_all_fide_ratings(fide_id):
  fide_dict = {}

  fide_dict["standard"] = []
  fide_dict["rapid"] = []
  fide_dict["blitz"] = []

  for filename in os.listdir("fide"):
    if not (filename.endswith(".txt")):
      continue

    if len(filename.split("_")) > 2:
      continue

    f = open("fide/" + filename)

    line = None

    for l in f.readlines():
      tokens = filter(None, l.split(" "))
      if not tokens[0].isdigit():
        continue
      _id = tokens[0]
      if int(fide_id)==int(_id):
        rating = [l for l in tokens[:-2] if len(l) == 4 and l.isdigit()][0]
        rating_type, date = filename.split("_")
        date = date[:-4]
        temp_date = fide_filename_to_date(date)

        fide_dict[rating_type].append([temp_date, int(rating)])

    fide_dict["standard"] = sorted(fide_dict["standard"], key = lambda x: (x[0][0], x[0][1]))
    fide_dict["rapid"] = sorted(fide_dict["rapid"], key = lambda x: (x[0][0], x[0][1]))
    fide_dict["blitz"] = sorted(fide_dict["blitz"], key = lambda x: (x[0][0], x[0][1]))

  return fide_dict["standard"], fide_dict["rapid"], fide_dict["blitz"]


def get_ratings_by_name(full_name):
  elo_dict = {}
  elo_dict["elos"] = []
  elo_dict["games"] = []

  for date in rating_files:
    file_name = "ratingtall/" + date + ".txt"

    f = open(file_name)

    line = None

    for l in f.readlines():
      line_name = l[6:31].strip()
      if line_name in full_name:
        line = l
        break

    if line:
      temp_date = filename_to_date(date)

      line = line.replace('Æ', '_').replace('æ', '_').replace('Ø', '_').replace('ø', '_').replace('Å', '_').replace('å', '_').replace('ö', '_').replace('ä', '_').replace(')', ' ')

      player = RatingGraphObject(line)

      dictplayer = player.__dict__

      elo_dict["elos"].append([temp_date, int(dictplayer['temp_elo'])])

      if dictplayer['games'].isdigit():
        elo_dict["games"].append([temp_date, int(dictplayer["games"])])

  return elo_dict["elos"], elo_dict["games"]


if __name__=="__main__":
    print get_all_fide_ratings(1500015)
