#!/usr/bin/env python
# -*- coding: utf-8 -*-

rating_files = ["1996jan", "1996apr", "1996jun", "1996aug", "1996okt", "1996des", "1997jan", "1997apr", "1997jun", "1997sep", "1997des", "1998jan", "1998apr", "1998jun", "1998okt", "1998des", "1999jan", "1999apr", "1999jun", "1999sep", "1999des", "2000jan", "2000mai", "2000jun", "2000okt", "2001jan", "2001apr", "2001jun", "2001okt", "2002jan", "2002apr", "2002jul", "2003jan", "2003mar", "2003jun", "2003sep", "2004jan", "2004mai", "2004jun", "2004okt", "2005jan", "2005apr", "2005jun", "2005okt", "2006jan", "2006apr", "2006jun", "2006okt", "2007jan", "2007mar", "2007jun", "2007sep", "2008jan", "2008apr", "2008jun", "2008sep", "2009jan", "2009apr", "2009jun", "2009sep", "2010jan", "2010apr", "2010jun", "2010sep", "2011jan", "2011apr", "2011jun", "2011sep", "2012jan", "2012apr", "2012jun", "2012sep", "2013jan", "2013apr", "2013jun", "2013sep", "2014jan", "2014apr", "2014jun", "2014sep", "2015jan", "2015apr", "2015jun", "2015sep"]

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
    self.title = line[82:90].strip()
    self.standard = line[108:115].strip()
    self.country = "NOR"

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

  return [year, month]

def get_fide_rating(fide_id):

  f = open("fide_ratings/fide_standard_ratings.txt")

  line = None

  for l in f.readlines():
    _id = int(l[:15].strip())
    print _id
    if int(fide_id)==_id:
      line = l
      break

  if not line:
    return [None, "", ""]

  if line:

    player = FideRatingObject(line)

    dictplayer = player.__dict__

    return dictplayer["country"], dictplayer["standard"], dictplayer["title"]

def get_ratings_by_name(full_name):
  elo_dict = {}
  elo_dict["elos"] = []
  elo_dict["categories"] = []
  elo_dict["fide_elos"] = []
  elo_dict["rapid_elos"] = []
  elo_dict["blitz_elos"] = []
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
      line = line.replace('Æ', '_').replace('æ', '_').replace('Ø', '_').replace('ø', '_').replace('Å', '_').replace('å', '_').replace('ö', '_').replace('ä', '_').replace(')', ' ')

      player = RatingGraphObject(line)

      dictplayer = player.__dict__

      elo_dict["categories"].append(filename_to_date(date))
      elo_dict["elos"].append(int(dictplayer['temp_elo']))

      if not dictplayer['fide_elo'].isdigit():
        elo_dict["fide_elos"].append(None) 
      else:
        elo_dict["fide_elos"].append(int(dictplayer['fide_elo']))       

      if not dictplayer['rapid_elo'].isdigit():
        elo_dict["rapid_elos"].append(None) 
      else:
        elo_dict["rapid_elos"].append(int(dictplayer['rapid_elo']))

      if not dictplayer['blitz_elo'].isdigit():
        elo_dict["blitz_elos"].append(None) 
      else:
        elo_dict["blitz_elos"].append(int(dictplayer['blitz_elo']))

      if not dictplayer['games'].isdigit():
        elo_dict["games"].append(None)
      else:
        elo_dict["games"].append(int(dictplayer["games"]))

  return elo_dict["categories"], elo_dict["elos"], elo_dict["fide_elos"], elo_dict["rapid_elos"], elo_dict["blitz_elos"], elo_dict["games"]
