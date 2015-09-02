#!/usr/bin/env python
# -*- coding: utf-8 -*-

import tornado.escape
import tornado.ioloop
import tornado.web
from parsing import *
import collections
import memcache

mc = memcache.Client(['127.0.0.1:11211'], debug=1)

class PostHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')

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

        player = next((x for x in response if x["nsf_id"] == _id), None)

        self.write(json.dumps(player, indent=4, ensure_ascii=False))


class TopHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')

        limit = self.get_argument('limit', '', False)
        arg = self.get_argument('arg', 'elo', False)
        order = self.get_argument('order', 'top', False)

        mc_key = limit + arg + order
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
            response[date] = [player.__dict__ for player in p if player.elo!=0 and player.number_of_games!=0]

            if limit:
                response[date] = response[date][:limit]

            mc.set(mc_key, response, 1)

        self.write(json.dumps(response, indent=4, ensure_ascii=False))


application = tornado.web.Application([
    (r"/", PostHandler),
    (r"/top/?", TopHandler),
    (r"/player/(\d+)/?", PlayerHandler),
    (r"/date/?", DateHandler),
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

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
