import os

check = open("standard_jul1999.txt")
check_lines = check.readlines()
cc = []

for line in check_lines:
	line = filter(None, line.split(" "))
	line[2] = line[2][0].strip()
	cc.append(line)


for filename in os.listdir("."):
	if not filename.lower().endswith(".txt"):
		continue

	f = open(filename)

for filename in os.listdir("."):
	if not filename.lower().endswith(".txt"):
		continue

	if filename == "siste.txt":
		continue

	f = open(filename)
	lines = f.readlines()

	if filter(None, lines[0].split(" "))[0].isdigit():
		continue

	temp = open(filename + "_temp", "w")

	for line in lines:
		stuff = line.split("NOR")
		name = stuff[0]
		if "," in name:
			last_name, first_name = name.split(",")
			first_letter = first_name[0].strip()

		print last_name, first_letter


				
