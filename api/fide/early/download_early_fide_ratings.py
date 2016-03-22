import zipfile
import urllib
import os
import xml.etree.ElementTree as ET

"""
Download historical FIDE ratings (1971-2000)
"""

def retrieve_file(file_name):
	print "Downloading " + file_name

	try:
		_file = urllib.URLopener()
		_file.retrieve("http://www.mark-weeks.com/chess/ratings/" + file_name, file_name)
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

	file_names = []

	for year in range(1975, 2001):
		file_names.append(str(year) + "-01.zip")

	for year in range(1990, 2001):
		file_names.append(str(year) + "-07.zip")

	for year in range(1971, 1975):
		file_names.append(str(year) + ".zip")

	for _file in file_names:
		retrieve_file(_file)
		unzip(_file)

	for filename in os.listdir("."):
		if not filename.lower().endswith(".txt"):
			continue

		os.rename(filename, filename.lower())
		filename = filename.lower()

		if not "-" in filename:
			year = filename.split(".")[0]
			os.rename(filename, "standard_" + year + ".txt")
			filename = "standard_" + year + ".txt"
		else:
			year, month = filename.split("-")
			if month == "01.txt":
				month = "jan"
			elif month == "07.txt":
				month = "jul"
			else:
				print "Error."
				continue
			os.rename(filename, "standard_" + month + year + ".txt")
			filename = "standard_" + month + year + ".txt"

		with open(filename) as f, open(filename + "~", "w") as temp:
			for line in f:
				if "NOR" in line:
					temp.write(line)

		os.rename(filename + "~", filename)
