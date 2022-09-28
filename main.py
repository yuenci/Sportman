from flask_cors import CORS
from flask import Flask, request
from flasgger import Swagger
from flasgger import swag_from
import dictionary


app = Flask(__name__)
swagger = Swagger(app)
CORS(app, resources=r'/*')
# 获得数据库中的句子


@app.route('/sentences', methods=["GET"])
@swag_from('./server/API/color.yml')
def getSen():
    dict = dictionary.getAllSentence()
    return dict

# 查找包含特定词的句子


@app.route('/sentences/query', methods=["GET"])
def querySen():
    type = request.args["type"]
    word = request.args["word"]
    dict = dictionary.querySentencesFromDB(type, word)
    return dict

# 获取随意的一个句子


@app.route('/sentences/lucky', methods=["GET"])
def getLucky():
    dict = dictionary.getlucky()
    return dict


@app.route('/sentences/trash', methods=["GET"])
def trashSen():
    dict = dictionary.getTrash()
    return dict


@app.route('/sentences/trash', methods=["PATCH"])
def restoreSen():
    jsonData = request.json
    sentenceID = jsonData["sentenceID"]
    dict = dictionary.restoreSen(sentenceID)
    return dict

# 获取解释


@app.route('/explains', methods=["GET"])
def getExp():
    word = request.args["word"]
    print("🗺️ router>" + word)
    dict = dictionary.getExplain(word)
    return dict

# 获取全部例子


@app.route('/examples', methods=["GET"])
def getExa():
    word = request.args["word"]
    print("🗺️ router>" + word)
    dict = dictionary.queryData(word)
    return dict

# 更新例子显隐


@app.route('/examples', methods=["PUT"])
def putExa():
    jsonData = request.json
    word = jsonData["word"]
    print("🗺️ router>" + word)
    exampleJson = jsonData["examples"]
    dict = dictionary.updateExamples(word, exampleJson)  # 传入json
    return dict

# 创建例子练习数据


@app.route('/examples', methods=["POST"])
def postExa():
    jsonData = request.json
    word = jsonData["word"]
    print("🗺️ router>" + word)
    examplesList = jsonData["examples"]
    dict = dictionary.createExampleRecord(word, examplesList)  # 传入list
    return dict

# 获得一个没学习完的句子


@app.route('/examples/new', methods=["GET"])
def getNewExa():
    word = request.args["word"]
    print("🗺️ router>" + word)
    dict = dictionary.getNewExample(word)
    return dict

# 更新学习时间


@app.route('/examples/duration', methods=["PATCH"])
def updateDur():
    #print("👉get duration👈")
    jsonData = request.json

    # print("🗺️ router>" + word +
    #       "duration: " + duration)
    dict = dictionary.updateDuration(jsonData)
    return dict

# 获得例子学习信息


@app.route('/examples/status', methods=["GET"])
def getStatus():
    word = request.args["word"]
    print("🗺️ router>" + word + " get status")
    dict = dictionary.wordStudyStatus(word)
    print(dict)
    return dict

# 获得例子连胜纪录


@app.route('/examples/streak', methods=["GET"])
def getStreak():
    dict = dictionary.getStreakData()
    print(dict)
    return dict

# 储存新的句子


@app.route('/sentences', methods=["POST"])
def postSens():
    jsonData = request.json
    sentence = jsonData["sentence"]
    dict = dictionary.postSentencesToDB(sentence)
    return dict

# 删除句子


@app.route('/sentences', methods=["DELETE"])
def deleteSentence():
    jsonData = request.json
    sentenceID = jsonData["sentenceID"]
    dict = dictionary.deleteSentence(sentenceID)
    return dict

# 导入一批句子


@app.route('/sentences/batch', methods=["POST"])
def postBatchSens():
    jsonData = request.json
    sentencesList = jsonData["sentences"]
    dict = dictionary.getBatchSentence(sentencesList)
    return dict

# 储存登录信息


@app.route('/log/login', methods=["POST"])
def logLogin():
    jsonData = request.json
    dict = dictionary.logForLogin(jsonData)
    return dict

# 获得热力图组件数据


@app.route('/data/heatmap', methods=["GET"])
def getHeatmapData():
    dict = dictionary.getHeatMapData()
    return dict

# 获得学习数据


@app.route('/data/learing', methods=["GET"])
def getLearingData():
    dict = dictionary.getLearningData()
    return dict


@app.route('/tags', methods=["GET"])
def getTag():
    dict = dictionary.getTag()
    return dict


@app.route('/tags', methods=["POST"])
def postTag():
    jsonData = request.json
    tagList = jsonData["tag"]
    dict = dictionary.postTag(tagList)
    return dict


@app.route('/tags', methods=["PATCH"])
def patchTag():
    jsonData = request.json
    dict = dictionary.updateTag(jsonData)
    return dict


@app.route('/tags', methods=["DELETE"])
def deleteTag():
    jsonData = request.json
    tag = jsonData["tag"]
    dict = dictionary.deleteTag(tag)
    return dict


@app.route('/configs', methods=["PUT"])
def putCachePosition():
    jsonData = request.json
    position = jsonData["position"]
    print("🗺️ router>" + position)
    dict = dictionary.putCachePositionToFile(position)
    return dict


@app.route('/chat', methods=["POST"])
def postMsg():
    jsonData = request.json
    messagesList = jsonData["messages"]
    dict = dictionary.postChatMessage(messagesList)
    return dict


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port="5000")
