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


class TopHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')

        limit = self.get_argument('limit', 10, False)
        arg = self.get_argument('arg', 'elo', False)
        order = self.get_argument('order', 'top', False)

        if order == 'top':
            order = True
        else:
            order = False

        if not limit.isdigit():
            limit = 10
        else:
            limit = int(limit)

        p = sorted(players, key=lambda x: getattr(x, arg), reverse=order)

        response = {}
        response[date] = [player.__dict__ for player in p][:limit]

        self.write(json.dumps(response, indent=4, ensure_ascii=False))


application = tornado.web.Application([
    (r"/", PostHandler),
    (r"/top/?", TopHandler),
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
