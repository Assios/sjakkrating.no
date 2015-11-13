import zipfile
import urllib
import xmltodict
import os
import xml.etree.ElementTree as ET


def retrieve_player_list_xml():
	print "Downloading players_list_xml.zip"

	try:
		_file = urllib.URLopener()
		_file.retrieve("http://ratings.fide.com/download/players_list_xml.zip", "player_list_xml.zip")
		print "Retrieved player_list_xml.zip successfully."
		return True
	except:
		print "Failed to retrieve player_list_xml.zip"
		return False

def unzip_player_list():
	print "Unzipping player_list_xml.zip..."

	fh = open('player_list_xml.zip', 'rb')
	z = zipfile.ZipFile(fh)
	for name in z.namelist():
	    z.extract(name, ".")
	fh.close()

	os.remove("player_list_xml.zip")
	print "Removed player_list_xml.zip."

##retrieve_player_list_xml()
##unzip_player_list()

class Player:
	def __init__(self, fideid, title, rating, rapid_rating, blitz_rating):
		self.fideid = fideid
		self.country = "NOR"
		self.title = title
		self.rating = rating
		self.rapid_rating = rapid_rating
		self.blitz_rating = blitz_rating

players = []

tree = ET.parse("players_list_xml.xml")
root = tree.getroot()

for player in root:
	fed = player.find("country").text
	if fed=="NOR":
		fideid = player.find("fideid").text
		title = player.find("title").text
		rating = player.find("rating").text
		rapid_rating = player.find("rapid_rating").text
		blitz_rating = player.find("blitz_rating").text
		players.append(Player(fideid, title, rating, rapid_rating, blitz_rating))
		continue
