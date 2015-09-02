#!/usr/bin/env python
# -*- coding: utf-8 -*-

import tornado.escape
import tornado.ioloop
import tornado.web
from parsing import *
import collections

class PostHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')

        self.write(json.dumps(response, indent=4, ensure_ascii=False))


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

        limit = self.get_argument('limit', None, False)
        arg = self.get_argument('arg', 'elo', False)
        order = self.get_argument('order', 'top', False)

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
        response[date] = [player.__dict__ for player in p]

        if limit:
            response[date] = response[date][:limit]

        self.write(json.dumps(response, indent=4, ensure_ascii=False))



application = tornado.web.Application([
    (r"/", PostHandler),
    (r"/top/?", TopHandler),
    (r"/player/(\d+)/?", PlayerHandler),
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
