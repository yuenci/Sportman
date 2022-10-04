import multiprocessing
from faker import Faker
import pickle
import pymysql
from readmdict import MDX, MDD  # pip install readmdict
from bs4 import BeautifulSoup
import re
from pprint import pp, pprint
import json
import random
import time
from collections import Counter
import DB
import os
import config
import datetime
import AI


'''获取一个sql 连接
无需反复填写端口号等信息, 可以直接获取连接
args: 无
return conn object
raise: 无
'''


def getConn():
    conn = pymysql.connect(host='127.0.0.1', port=3306,
                           user='root', password='root', database='sportsman')
    return conn


'''从mdx中获取到单词的html数据
mdx由大量html页面组成, 而且有索引, 所以可以根据输入的单词获得对应的html页面, 然后使用BeautifulSoup抓取需要的内容, 返回即可
args: 需要获取数据的单词
return:包含多个example的span元素
'''


def getHtmlDataFromMDX(wordInput):
    filename = "dictMdx/O7.mdx"
    headwords = [*MDX(filename)]
    items = [*MDX(filename).items()]
    # if len(headwords) == len(items):
    #     print(f'加载成功：共{len(headwords)}条')
    # else:
    #     print(f'【ERROR】加载失败{len(headwords)}, {len(items)}')
    queryWord = wordInput
    global ifWordExistInMDX
    try:
        wordIndex = headwords.index(queryWord.encode())
        word, html = items[wordIndex]
        word, html = word.decode(), html.decode()
        # print(word, html)

        soup = BeautifulSoup(html, 'lxml')
        # print(soup.prettify())
        allSpan = soup.find_all(attrs={'class': 'sentence_eng'})
        ifWordExistInMDX = True
        return allSpan
    except:
        ifWordExistInMDX = False
        return None


'''把span数据 变为json
从mdx获取到的数据是span, 而且span里还有其他的span, 所以需要清洗。而且前端需要的是有display状态的数据, 这个也需要插入到json中
args: 从mdx中获取到spans
return: string json, {1:{"content":"sentence","display":true}}
'''

# 需要把文本中的单引号去除, 否则合成sql的时候会影响文本插入


def encodeText(word):
    return word.replace("'", "--")


def decodeText(word):
    return word.replace("--", "'")


def spansToJson(data):
    i = 1
    resDict = {}
    reg = r'<span class="sentence_eng">(.*)<\/span>'  # 获取span元素中的内容, 丢弃标签
    regex = r"<span class=\".*?\">|<\/span>"  # 删除无关的span标签

    # reg = r'<span class="sentence_eng">(.*?)<\/span>' 非贪婪

    for element in data:
        plainText = re.findall(reg, str(element))[0].strip()
        result = re.sub(regex, "", plainText, 0)
        resDict.update({i: {"content": result, "display": True}})
        i += 1

    # 需要把文本中的单引号去除, 否则合成sql的时候会影响文本插入
    resTxt = encodeText(json.dumps(resDict))

    # print(resTxt)

    return resTxt


# spans = getHtmlDataFromMDX("good")
# spansToJson(spans)


# store word data to db
'''把examples数据存到db
args：word 和数据
return：None
'''


def storeDataToDB(word, data):
    conn = getConn()
    cursor = conn.cursor()
    sql = f"INSERT INTO word_examples (word,examples) values ('{word}','{data}')"
    try:
        cursor.execute(sql)
        conn.commit()
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
    finally:
        cursor.close()
        conn.close()


'''检查数据库中是否存在单词的examples数据

'''
# check if words example exist in db, return ture/ false
# if exist, assign to global varial


def ifWordExapmleExist(word):
    conn = getConn()
    cursor = conn.cursor()
    sql = f"SELECT examples FROM word_examples WHERE word = '{word}';"
    try:
        cursor.execute(sql)
        data = cursor.fetchall()
        # pprint(data)
        if(data == None):
            return False
        elif(not data):
            return False
        else:
            return True
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return False
    finally:
        cursor.close()
        conn.close()


def getExistExamplesFromDB(word):
    conn = getConn()
    cursor = conn.cursor()
    sql = f"SELECT examples FROM word_examples WHERE word = '{word}';"
    try:
        cursor.execute(sql)
        dbResult = decodeText(cursor.fetchall()[0][0])
        return dbResult
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return {"error": "can't get exist examples from DB"}
    finally:
        cursor.close()
        conn.close()


def queryData(word):
    print(f"👉👉👉{word}")
    if(ifWordExapmleExist(word)):
        print("exist")
        return getExistExamplesFromDB(word)
    else:
        print("new one")
        try:
            html = getHtmlDataFromMDX(word)
            if(ifWordExistInMDX):
                data = spansToJson(html)
                storeDataToDB(word, data)
                # pprint(data)
                return data
            else:
                return {"msg": "word doesn't exist"}
        except:
            return {"msg": "word doesn't exist"}


# print(queryData("go"))
# print("yes")

# explain


def getExplain(word):
    word = word.lower()
    cachePosition = config.cache_dir
    cacheFile = cachePosition + "\\" + word + ".pkl"
    filePathsList = os.listdir(cachePosition)
    fileName = word + ".pkl"
    if fileName in filePathsList:
        f = open(cacheFile, 'rb')
        data = pickle.loads(f.read())
        f.close()
        return data
    filename = "dictMdx/LDOCE5.mdx"
    headwords = [*MDX(filename)]       # 单词名列表
    items = [*MDX(filename).items()]   # 释义html源码列表
    if len(headwords) == len(items):
        print(f'加载成功：共{len(headwords)}条')
    else:
        print(f'【ERROR】加载失败{len(headwords)}，{len(items)}')
    queryWord = word
    try:
        wordIndex = headwords.index(queryWord.encode())
    except:
        return {"msg": "word doesn't exist"}
    word, html = items[wordIndex]
    word, html = word.decode(), html.decode()
    soup = BeautifulSoup(html, 'lxml')
    allSpan = soup.find_all(attrs={'class': 'newline'})
    jsonData = json.dumps([str(ele) for ele in allSpan])

    f = open(f"{cacheFile}", 'wb')
    print(cacheFile)
    content = pickle.dumps(jsonData)
    f.write(content)
    f.close()

    return jsonData


def getExplain11(word):

    # 加载mdx文件
    filename = "dictMdx/LDOCE5.mdx"
    headwords = [*MDX(filename)]       # 单词名列表
    items = [*MDX(filename).items()]   # 释义html源码列表
    if len(headwords) == len(items):
        print(f'加载成功：共{len(headwords)}条')
    else:
        print(f'【ERROR】加载失败{len(headwords)}，{len(items)}')

    # 查词，返回单词和html文件
    queryWord = word
    wordIndex = headwords.index(queryWord.encode())
    word, html = items[wordIndex]
    word, html = word.decode(), html.decode()
    # print(word, html)
    # with open("white.html", "w+", encoding="utf-8") as f:
    #     f.write(html)

    soup = BeautifulSoup(html, 'lxml')
    # print(soup.prettify())
    allSpan = soup.find_all(attrs={'class': 'newline'})
    # for ele in allSpan:
    #     pprint(type(str(ele)))

    jsonData = json.dumps([str(ele) for ele in allSpan])

    f = open('jsn.pkl', 'wb')
    content = pickle.dumps(jsonData)
    f.write(content)
    f.close()
    with open(f"{word}.json", "w+") as f:
        f.write(jsonData)
    return jsonData


def getExplain111(word):
    f = open('./jsn.pkl', 'rb')
    jsonData = pickle.loads(f.read())
    f.close()
    return jsonData

# list1 = getExplain("above")
# print("yes")
# for ele in list1:
#     print(type(ele))


def updateExamples(word, examplesJson):
    print("updateExamples yes")
    sql = f"UPDATE word_examples SET examples='{encodeText(json.dumps(examplesJson))}' where word ='{word}'"

    conn = getConn()
    cursor = conn.cursor()
    try:
        cursor.execute(sql)
        conn.commit()
        return {"msg": "success"}
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return {"msg": "failed"}
    finally:
        cursor.close()
        conn.close()


def createExampleRecord(word, examplesList):
    print("createExampleRecord yes")
    sql = f"INSERT INTO examples_data (word, examples) VALUES (%s, %s);"
    print(sql)
    sqlArgList = []
    for ele in examplesList:
        sqlArgList.append((word, ele))

    conn = getConn()
    cursor = conn.cursor()
    try:
        cursor.executemany(sql, sqlArgList)
        conn.commit()
        return {"msg": "success"}
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return {"msg": "failed"}
    finally:
        cursor.close()
        conn.close()


# createExampleRecord("bad", ["this is bad", "bad is not good"])
# print("done")

def getNewExample(word):
    conn = getConn()
    cursor = conn.cursor()
    sql = f"SELECT examples,listening,speaking,reading,writing,id FROM examples_data WHERE word = '{word}';"
    try:
        cursor.execute(sql)
        res = cursor.fetchall()

        if(not res):
            return {"error": "can't get new examples from DB"}

        resList = []
        for ele in res:
            if(not (ele[1] and ele[2] and ele[3] and ele[4])):
                resList.append([ele[0], ele[5]])
        ranExample = random.choice(resList)

        return {"example": ranExample[0],
                "id": ranExample[1]
                }

    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return {"error": "can't get exist examples from DB"}
    finally:
        cursor.close()
        conn.close()


# print(getNewExample("all"))


def updateDuration(jsondata):
    # pprint(jsondata)
    id = jsondata["id"]
    type1 = jsondata["type"]
    duration = jsondata["duration"]
    conn = getConn()
    cursor = conn.cursor()
    sql = f"UPDATE examples_data SET {type1} ={type1}+ {duration} WHERE id =  '{id}';"
    # print(sql)
    try:
        cursor.execute(sql)
        conn.commit()
        return {"msg": "success"}
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return {"error": "can't update duraiton"}
    finally:
        cursor.close()
        conn.close()


def wordStudyStatus(word):
    conn = getConn()
    cursor = conn.cursor()
    sql = f"SELECT * FROM examples_data WHERE word = '{word}';;"
    try:
        cursor.execute(sql)
        data = cursor.fetchall()
        if(not data):
            return {"status": False}
        else:
            return {"status": True}
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return {"error": "can't get learing status from DB"}
    finally:
        cursor.close()
        conn.close()


def insertSentence(sen):
    conn = getConn()
    cursor = conn.cursor()
    sql = f"INSERT INTO inbox_sentences (sentence) VALUES ('{encodeText(sen)}');"
    try:
        cursor.execute(sql)
        conn.commit()
        print("yes")
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return {"error": "can't insert sentence to DB"}
    finally:
        cursor.close()
        conn.close()


# insertSentence("today is a good day")
# insertSentence("Above all , I'd like to thank my family .")

def getAllSentence():
    conn = getConn()
    cursor = conn.cursor()
    sql = "SELECT sentence,create_time,id FROM inbox_sentences WHERE status<>-1 ORDER BY create_time ASC;"
    try:
        cursor.execute(sql)
        data = cursor.fetchall()
        newData = []
        for ele in data:
            newData.append([decodeText(ele[0]), str(ele[1]), ele[2]])
        # data = [list(ele) for ele in data]
        return {"data": newData}
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return {"error": "can't get sentences from DB"}
    finally:
        cursor.close()
        conn.close()


def postSentencesToDB(sentence):
    conn = getConn()
    cursor = conn.cursor()
    sentence = encodeText(sentence)
    sql1 = f"INSERT INTO inbox_sentences (sentence) VALUES ('{sentence}');"
    sql2 = "select max(id) from inbox_sentences;"

    try:
        cursor.execute(sql1)
        conn.commit()

        cursor.execute(sql2)
        data = cursor.fetchall()
        return {"msg": "success",
                "id": data[0][0]}
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
    finally:
        cursor.close()
        conn.close()


def matchWord(word):
    regexWord = r"^[a-zA-Z]+$"
    regexWordAndPunc = r"^[a-zA-Z]+\D$"
    regexPuncAndWord = r"^\D[a-zA-Z]+$"

    if re.search(regexWord, word):
        #print("🔵: " + word)
        return word
    elif re.search(regexWordAndPunc, word):
        #print("🔵🔘: " + word + " " + word[:-1])
        return word[:-1]
    elif re.search(regexPuncAndWord, word):
        #print("🔘🔵 " + word + " " + word[1:])
        return word[1:]
    else:
        #print("❌: " + word)
        return None


def createWordExpalinCache(sentence):
    # print(sentence)
    words = sentence.split(" ")
    for ele in words:
        word = matchWord(ele)
        if(word):
            word = word.lower()
            getExplain(word)
    return {"msg": "success"}


def querySentencesFromDB(type, word):
    conn = getConn()
    cursor = conn.cursor()
    sql = ""
    sqlWord = f"SELECT sentence, create_time,id FROM inbox_sentences WHERE status<>-1 AND sentence like '%{word}%' ORDER BY create_time ASC"
    sqlTime = f"SELECT sentence, create_time,id  FROM inbox_sentences WHERE status<>-1 AND DATE(create_time) = '{word[:10]}'  ORDER BY create_time ASC; "
    if(type == "word"):
        sql = sqlWord
    elif(type == "time"):
        sql = sqlTime

    try:
        cursor.execute(sql)
        data = cursor.fetchall()
        newData = []
        for ele in data:
            newData.append([ele[0], str(ele[1]), ele[2]])
        return {"data": newData}
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return {"error": "can't query sentences from DB"}
    finally:
        cursor.close()
        conn.close()


def deleteSentence(sentenceID):
    sql = f"UPDATE inbox_sentences SET status = -1, delete_time = '{ datetime.datetime.now()}'\
        WHERE id = {sentenceID};"

    res = DB.excute(sql)
    if(res):
        return {"msg": "success"}
    else:
        return {"error": "can't delete sentence"}


def getlucky():
    sql = "SELECT sentence, create_time,id FROM inbox_sentences as t1 WHERE status<>-1 AND t1.id >= (RAND()*(SELECT MAX(id) FROM inbox_sentences)) LIMIT 1;"
    data = DB.query(sql)
    if(data):
        return {
            "sentence": data[0][0],
            "time": str(data[0][1]),
            "id": data[0][2]
        }
    else:
        return {"error": "can't get lucky sentence"}


def getTrash():
    sql = "SELECT sentence, delete_time ,id FROM inbox_sentences WHERE status=-1 ORDER BY create_time ASC;"
    data = DB.query(sql)
    data = [list(ele) for ele in data]
    for ele in data:
        ele[1] = str(ele[1])
        ele[2] = str(ele[2]) + "-1"
    if(data):
        return {"data": data}
    else:
        return {"error": "can't get trash sentences"}


def restoreSen(sentenceID):
    sql = f"UPDATE inbox_sentences SET status = 0 WHERE id = {sentenceID};"
    res = DB.excute(sql)
    if(res):
        return {"msg": "success"}
    else:
        return {"error": "can't restore sentences"}


def logForLogin(jsonData):
    type = jsonData["type"]
    conn = getConn()
    cursor = conn.cursor()
    sql = f"INSERT INTO logs (type) VALUES ('{type}');"
    try:
        cursor.execute(sql)
        conn.commit()
        return {"msg": "success"}
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return {"error": "can't insert sentence to DB"}
    finally:
        cursor.close()
        conn.close()


# region

# fake = Faker(locale='en_US')

# for i in range(30):
#     datetime = Regtime = fake.unique.date_time_between(
#         start_date='-90d', end_date='now', tzinfo=None)
#     sql = f"INSERT INTO logs (type,create_time) VALUES ('login','{datetime}')"
#     conn = getConn()
#     cursor = conn.cursor()
#     cursor.execute(sql)
#     conn.commit()
# print("done")

# fake = Faker(locale='en_US')
# for ele in range(1000):
#     print(ele)
#     word = fake.word()
#     sen = fake.sentence(nb_words=6, variable_nb_words=True)
#     datetime = Regtime = fake.date_time_between(
#         start_date='-90d', end_date='now', tzinfo=None)
#     conn = getConn()
#     cursor = conn.cursor()
#     sql = f"INSERT INTO examples_data (word,examples,listening,speaking,reading,writing,create_time) \
#         VALUES ('{word}','{sen}',{random.randint(1, 10)},\
#         {random.randint(1, 10)},{random.randint(1, 10)},{random.randint(1, 10)},'{datetime}');"

#     try:
#         cursor.execute(sql)
#         conn.commit()
#     except pymysql.Error as e:
#         conn.rollback()
#         print(e.args[0], e.args[1])
#     finally:
#         cursor.close()
#         conn.close()
# print("done")


# fake = Faker(locale='en_US')
# for ele in range(20):
#     datetime = Regtime = fake.date_time_between(
#         start_date='-5d', end_date='now', tzinfo=None)
#     sen = fake.sentence(nb_words=6, variable_nb_words=True)
#     sql = f"INSERT INTO inbox_sentences (sentence,create_time) VALUES('{sen}','{datetime}')"
#     conn = getConn()
#     cursor = conn.cursor()
#     cursor.execute(sql)
#     conn.commit()
# print("done")
# endregion

def getHeatMapData():
    sql = "SELECT listening + speaking + reading +writing,unix_timestamp(DATE(create_time))" +\
        "FROM examples_data WHERE to_days(now()) - to_days(create_time) <= 90; "

    sql1 = "SELECT DISTINCT unix_timestamp(Date(create_time)) FROM Logs"

    learingData = DB.query(sql)
    loginData = DB.query(sql1)

    try:
        newData = {}
        for ele in learingData:
            newData[ele[1]] = ele[0]
        for ele in loginData:
            if(ele not in newData):
                newData[ele[0]] = 0
        return newData
    except:
        return {"error": "can't query HeatMap Data from DB"}


def getLearningData():
    sql1 = "SELECT COUNT(*) FROM inbox_sentences ;"
    sql2 = "SELECT ROUND(SUM(listening + speaking + reading +writing)/60)  FROM examples_data;"
    sql3 = "SELECT COUNT( DISTINCT DATE(create_time)) FROM logs"

    res = {
        "sens": 0,
        "hour": 0,
        "day": 0
    }

    conn = getConn()
    cursor = conn.cursor()
    try:
        cursor.execute(sql1)
        sens = cursor.fetchall()
        # pprint(sens[0][0])
        res["sens"] = sens[0][0]

        cursor.execute(sql2)
        hour = cursor.fetchall()
        # pprint(int(hour[0][0]))
        res["hour"] = int(hour[0][0])

        cursor.execute(sql3)
        dayturple = cursor.fetchall()
        daysNum = dayturple[0][0]
        # print(result)
        res["day"] = daysNum

        return res
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return {"error": "can't query Learning Data from DB"}
    finally:
        cursor.close()
        conn.close()


def getTag():
    turData = DB.select(
        tableName="tags",
        colNames=["tag", "pined"],
        byCon="ORDER BY tag"
    )
    # print(turData)
    dictData = {}
    for ele in turData:
        dictData[ele[0]] = ele[1]
    return dictData


def postTag(tagList):
    res = None
    for tag in tagList:
        res = DB.insert(
            tableName="tags",
            colNames=["tag"],
            values=[[tag]]
        )
    if(res):
        return {"msg": "success"}
    else:
        return {"error": "can't insert tag to DB"}


def deleteTag(tag):
    res = DB.delete(
        tableName="tags",
        whereCon=f"tag='{tag}'"
    )
    if(res):
        return {"msg": "success"}
    else:
        return {"error": "can't delete tag from DB"}


def updateTag(jsonData):
    tag = jsonData["tag"]
    pined = jsonData["status"]
    res = DB.update(
        tableName="tags",
        dictData={"pined": pined},
        whereCon=f"tag = '{tag}'"
    )
    if(res):
        return {"msg": "success"}
    else:
        return {"error": "can't update tag from DB"}


def putCachePositionToFile(position):
    with open("./config.py", "r") as f:
        data = f.readlines()
    newData = []
    for ele in data:
        if "cache_dir" in ele:
            try:
                if not os.path.exists(position):
                    print("path not exist")
                    os.makedirs(position)
                ele = f"cache_dir = '{position}'\n"
                newData.append(ele)
            except:
                return {"msg": "failed"}
        else:
            newData.append(ele)
    with open("./config.py", "w") as f:
        f.write("".join(newData))
        print("success")
        return {"msg": "success"}


# putCachePositionToFile(r"E:\test")

def postChatMessage(messageList):
    res = AI.chat(messageList)
    return res


def storeBatchToDB(sentenceList):
    valueList = []
    for sen in sentenceList:
        valueList.append([sen])
    res = DB.insert(
        tableName="inbox_sentences",
        colNames=["sentence"],
        values=valueList
    )
    if(res):
        return {"msg": "success"}
    else:
        return {"error": "can't insert sentences to DB"}


def createWordsCache(sentenceList):
    for sen in sentenceList:
        createWordExpalinCache(sen)


def getBatchSentence(sentenceList):
    func1_process = multiprocessing.Process(
        target=storeBatchToDB, args=(sentenceList,))
    func2_process = multiprocessing.Process(
        target=createWordsCache, args=(sentenceList,))
    func1_process.start()
    func2_process.start()
    return {"msg": "success"}


# def getBatchSentence(sentenceList):
#     #print(sentenceList)
#     valueList = []
#     for sen in sentenceList:
#         valueList.append([sen])
#         # createWordExpalinCache(sen)

#     res = DB.insert(
#         tableName="inbox_sentences",
#         colNames=["sentence"],
#         values=valueList
#     )
#     if(res):
#         return {"msg": "success"}
#     else:
#         return {"error": "can't insert sentences to DB"}


def getStreakData():
    sql = "SELECT distinct DATE(create_time) from logs ORDER BY DATE(create_time) desc;"
    res = DB.query(sql)

    i = 0
    for ele in res:
        date = datetime.date.today() - datetime.timedelta(days=i)
        if(ele[0] == date):

            i += 1
        else:
            break
    return {"number": i}


def getExplainNotes(word):
    data = DB.select(
        tableName="explain_notes",
        colNames=["notes"],
        whereCon=f"word='{word}'"
    )
    if(data):
        return {"notes": data[0][0]}
    else:
        return {"error": "can't get notes to DB"}


def postExpalinNoteToDB(jsonData):
    word = jsonData["word"]
    notes = jsonData["notes"]

    data = DB.select(
        tableName="explain_notes",
        colNames=["notes"],
        whereCon=f"word='{word}'"
    )

    res = None

    if(data):
        res = DB.update(
            tableName="explain_notes",
            dictData={"notes": notes},
            whereCon=f"word='{word}'"
        )
    else:
        res = DB.insert(
            tableName="explain_notes",
            colNames=["word", "notes"],
            values=[[word, notes]]
        )

    if(res):
        return {"msg": "success"}
    else:
        return {"error": "can't insert notes to DB"}
