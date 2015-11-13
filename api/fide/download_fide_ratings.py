import zipfile
import urllib
import os
import xml.etree.ElementTree as ET


def retrieve_player_list_xml():
	print "Downloading standard_rating_list.zip"

	try:
		_file = urllib.URLopener()
		_file.retrieve("http://ratings.fide.com/download/standard_rating_list.zip", "standard_rating_list.zip")
		print "Retrieved standard_rating_list.zip successfully."
		return True
	except:
		print "Failed to retrieve standard_rating_list.zip"
		return False

def unzip_player_list():
	print "Unzipping standard_rating_list.zip..."

	fh = open('standard_rating_list.zip', 'rb')
	z = zipfile.ZipFile(fh)
	for name in z.namelist():
	    z.extract(name, ".")
	fh.close()

	os.remove("standard_rating_list.zip")
	print "Removed standard_rating_list.zip."

#retrieve_player_list_xml()
#zip_player_list()

class Player:
	def __init__(self, fideid, title, rating):
		self.fideid = fideid
		self.country = "NOR"
		self.title = title
		self.rating = rating

f = open("standard_rating_list.txt")

players = [l for l in f if "NOR" in l]

f = open('fide_standard_ratings.txt', 'w')

for line in players:
	f.write(line)

f.close()
