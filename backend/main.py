#!/usr/bin/env python
# -*- coding: utf-8 -*-

import tornado.escape
import tornado.ioloop
import tornado.web
from parsing import *
import collections
import memcache
from urllib import urlopen

mc = memcache.Client(['127.0.0.1:11211'], debug=1)

class PostHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')

        self.write(json.dumps(response, indent=4, ensure_ascii=False))

class StatsHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')

        players = [player for player in p if player.elo!=0 and player.number_of_games!=0]

        ratings = [player.elo for player in players]
        games = [player.number_of_games for player in players]

        ages = [pl.year_of_birth for pl in sorted(players, key=lambda x: getattr(x, "year_of_birth"), reverse=True)]

        average_rating = sum(ratings)/len(ratings)
        average_number_of_games = sum(games)/len(games)

        response = {
            "average_rating": average_rating,
            "average_number_of_games": average_number_of_games,
            "youngest_player": ages[0],
            "oldest_player": ages[-1],
        }

        self.write(json.dumps(response, indent=4, ensure_ascii=False))

class DateHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')

        r = {"date": date, "format_date": format_date(date)}

        self.write(json.dumps(r, indent=4, ensure_ascii=False))        

class PlayerHandler(tornado.web.RequestHandler):
    def get(self, _id):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')

        if _id.isdigit():
            _id = int(_id)

        response = [player.__dict__ for player in p]

        for x in response:
            if x["nsf_id"] == _id:
                player = x
                break

        mc_key = str(player["fide_id"])
        fide_info = mc.get(mc_key)

        if not fide_info:
            print "Not found in memcache. Fetching from FIDE..."
            fide_info = get_fide_rating(player["fide_id"])
            player["fide_rating"] = fide_info[0]
            player["fide_title"] = fide_info[1]
            mc.set(mc_key, fide_info, 3600*24*30)
        else:
            print "Found in memcache."

        self.write(json.dumps(player, indent=4, ensure_ascii=False))


class TopHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')

        limit = self.get_argument('limit', '', False)
        arg = self.get_argument('arg', 'elo', False)
        order = self.get_argument('order', 'top', False)
        player_gender = self.get_argument('gender', 'MF', False)

        mc_key = limit + arg + order + player_gender
        response = mc.get(mc_key)

        if not response:
            if order == 'top':
                order = True
            else:
                order = False

            if limit:
                if limit.isdigit():
                    limit = int(limit)
                else:
                    limit = 10

            p = sorted(players, key=lambda x: getattr(x, arg), reverse=order)

            response = {}
            response[date] = [player.__dict__ for player in p if player.elo!=0 and player.number_of_games!=0 and player.gender in player_gender]

            if limit:
                response[date] = response[date][:limit]

            mc.set(mc_key, response, 1)

        self.write(json.dumps(response, indent=4, ensure_ascii=False))


application = tornado.web.Application([
    (r"/", PostHandler),
    (r"/top/?", TopHandler),
    (r"/player/(\d+)/?", PlayerHandler),
    (r"/date/?", DateHandler),
    (r"/stats/?", StatsHandler),
])

def format_date(date):
    months = {
        "01": "januar",
        "02": "februar",
        "03": "mars",
        "04": "april",
        "05": "mai",
        "06": "juni",
        "07": "juli",
        "08": "august",
        "09": "september",
        "10": "oktober",
        "11": "november",
        "12": "desember"
    }

    day, month, year = date.split("/")

    day = str(int(day)) + "."
    month = months[month]
    year = "20" + year

    return day + " " + month + " " + year

def get_fide_rating(fide_id):
    title_mapping = {
        "None</t": "",
        "Woman I": "WIM",
        "Woman G": "WGM",
        "Woman F": "WFM",
        "Candida": "CM",
        "FIDE Ma": "FM",
        "Interna": "IM",
        "Grand M": "GM",
    }

    try:
        f = urlopen('https://ratings.fide.com/card.phtml?event=' + str(fide_id)).read()
        s = f.find('std.</small><br>')
        fide_rating = int(f[s+16:s+20])

        t = f.find('FIDE title</td><td colspan=3 bgcolor=#efefef>&nbsp;')

        fide_title = f[t+51:t+58].strip()

        fide_title = title_mapping[fide_title]

        return [fide_rating, fide_title]

    except:
        return [0, ""]

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
