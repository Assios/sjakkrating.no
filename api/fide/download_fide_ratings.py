import zipfile
import urllib
import os
import xml.etree.ElementTree as ET


def retrieve_file(file_name):
	print "Downloading " + file_name

	try:
		_file = urllib.URLopener()
		_file.retrieve("http://ratings.fide.com/download/" + file_name, file_name)
		print "Retrieved " + file_name + " successfully."
		return True
	except:
		print "Failed to retrieve " + file_name
		return False

def unzip(file_name):
	print "Unzipping " + file_name + "..."

	fh = open(file_name, 'rb')
	z = zipfile.ZipFile(fh)
	for name in z.namelist():
	    z.extract(name, ".")
	fh.close()

	os.remove(file_name)
	print "Removed " + file_name

if __name__ == "__main__":
	file_names = ["standard_rating_list.zip", "rapid_rating_list.zip", "blitz_rating_list.zip"]

	for _file in file_names:
		retrieve_file(_file)
		unzip(_file)
