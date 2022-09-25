from importlib.metadata import files
import os
from pprint import pp, pprint


def getFiles(file_dir):
    for root, dirs, files in os.walk(file_dir):
        return files


files = getFiles("./")

colors = []

for file in files:
    with open(file, "r") as f:
        data = f.readlines()
        for line in data:
            if " #" in line and "/*" not in line and "{" not in line:
                colors.append(line.split(" #")[1].strip().replace(
                    ";", "").replace("!important;", ""))

# res = []
# i = 1
# for ele in set(colors):
#     res.append(f"--{i}: #{ele};")
#     i += 1

# pprint(res)

pp(set(colors))
