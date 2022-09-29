import re

# regex = r"^((?!\p{P}|\d).)*[a-zA-Z]+((?!\p{P}|\d).)*$"

# test_str = "The rain in Spain"
# test_str = test_str.decode('utf8')

# matches = re.finditer(regex, test_str, re.UNICODE)

# for matchNum, match in enumerate(matches, start=1):

#     print("Match {matchNum} was found at {start}-{end}: {match}".format(
#         matchNum=matchNum, start=match.start(), end=match.end(), match=match.group()))

#     for groupNum in range(0, len(match.groups())):
#         groupNum = groupNum + 1

#         print("Group {groupNum} found at {start}-{end}: {group}".format(groupNum=groupNum,
#               start=match.start(groupNum), end=match.end(groupNum), group=match.group(groupNum)))


def matchWord(word):
    regexWord = r"^[a-zA-Z]+$"
    regexWordAndPunc = r"^[a-zA-Z]+\D$"
    regexPuncAndWord = r"^\D[a-zA-Z]+$"

    if re.search(regexWord, word):
        print("🔵: " + word)
        return word
    elif re.search(regexWordAndPunc, word):
        print("🔵🔘: " + word + " " + word[:-1])
        return word[:-1]
    elif re.search(regexPuncAndWord, word):
        print("🔘🔵 " + word + " " + word[1:])
        return word[1:]
    else:
        print("❌: " + word)


def test():
    matchWord("hello")
    matchWord("he?llo")
    matchWord("#hisdsadf")
    matchWord("hello?")
    matchWord("hello#")
    matchWord("asjdf;l??ds")
    matchWord("#aaadasdqw1")
    matchWord("he88llo")
    matchWord("#8hello")
    matchWord("hello9")


test()
