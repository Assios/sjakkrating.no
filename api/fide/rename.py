import os

def whole_year(file_name):
	first_part, last_part = file_name[:-9], file_name[-9:]
	os.rename(file_name, first_part + "20" + last_part)
	return first_part + "20" + last_part

for filename in os.listdir("."):
	if not filename.lower().endswith(".txt"):
		continue

	if filename[0].istitle():
		os.rename(filename, filename.lower())
		filename = filename.lower()

	if not "_" in filename:
		os.rename(filename, "standard_" + filename)
		filename = "standard_" + filename

	filename = whole_year(filename)

	with open(filename) as f, open(filename + "~", "w") as temp:
		for line in f:
			if "NOR" in line:
				temp.write(line)

	os.rename(filename + "~", filename)

	if "frl" in filename:
		os.rename(filename, filename.replace("frl", ""))