#!/usr/bin/env python
# -*- coding: utf-8 -*-

import tornado.escape
import tornado.ioloop
import tornado.web
from parsing import *
import numpy as np

class PostHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')

        self.write(json.dumps(response, indent=4, ensure_ascii=False))

class DistributionHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')

        r = range(500, 2950, 50)

        x_axis = []

        for i in range(len(r)-1):
            x_axis.append(str(r[i]) + "-" + str(r[i+1]))

        hgram = np.histogram(all_ratings, bins=r)

        self.write(json.dumps({"y": hgram[0].tolist(), "x": x_axis}, indent=4, ensure_ascii=False))

class DateHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Content-Type', 'application/json')

        r = {"date": date}

        self.write(json.dumps(r, indent=4, ensure_ascii=False))        

application = tornado.web.Application([
    (r"/", PostHandler),
    (r"/date/?", DateHandler),
    (r"/distribution/?", DistributionHandler), 
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
