import os

for filename in os.listdir("."):
	if not filename.lower().endswith(".txt"):
		continue

	first, last = filename[:-6], filename[-6:]
	if last == "00.txt":
		last = "2000.txt"
	else:
		last = "19" + last

	os.rename(filename, first + last)