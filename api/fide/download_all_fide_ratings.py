import zipfile
import urllib
import os
import xml.etree.ElementTree as ET


def retrieve_file(file_name):
	print "Downloading " + file_name

	try:
		_file = urllib.URLopener()
		_file.retrieve("http://ratings.fide.com/download/" + file_name, file_name)
		print "YO"
		print "Retrieved " + file_name + " successfully."
		return True
	except:
		print "Failed to retrieve " + file_name
		return False

def unzip(file_name):
	print "Unzipping " + file_name + "..."

	try:
		fh = open(file_name, 'rb')
		z = zipfile.ZipFile(fh)
		for name in z.namelist():
		    z.extract(name, ".")
		fh.close()
		os.remove(file_name)
		print "Removed " + file_name
		return True
	except:
		print "Failed to unzip " + file_name
		return False

def str_zeros(digit):
	return str(digit).zfill(2)

if __name__ == "__main__":

	ratings = ["standard", "rapid", "blitz"]
	years = map(str_zeros, range(01, 17))
	months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]

	file_names_0 = []
	file_names_1 = []

	for i in range(1, 13):
		for month in months:
			year = str_zeros(i)
			file_names_0.append(month + year + "frl.zip")

	file_names_0 = file_names_0[:-5]

	for i in range(12, 17):
		for month in months:
			for rating in ratings:
				year = str_zeros(i)
				file_names_1.append(rating + "_" + month + year + "frl.zip")

	file_names_1 = file_names_1[19:]

	file_names = file_names_0 + file_names_1

	for _file in file_names:
		retrieve_file(_file)
		unzip(_file)
