rating_files = ["2014jan", "2014apr", "2014jun", "2014sep", "2015jan", "2015apr", "2015jun"]

file_name = "ratingtall/" + rating_files[0] + ".txt"

f = open(file_name)

class RatingGraphObject:
    def __init__(self, line):
        self.full_name = line[6:33].strip()
        self.club = line[33:55].strip()
        self.temp_elo = line[55:59].strip()

player = RatingGraphObject(f.readlines()[5])

dictplayer = player.__dict__

dictplayer["elos"] = []

dictplayer["elos"] = {}

dictplayer["elos"][rating_files[0]] = dictplayer["temp_elo"]

print dictplayer

def get_ratings_by_name(full_name):
  for date in rating_files:
    file_name = "ratingtall/" + rating_files[date] + ".txt"

    f = open(file_name)

    