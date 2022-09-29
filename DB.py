
from multiprocessing.sharedctypes import Value
from turtle import done
from typing import Dict, Optional, Union, Any, List
import pymysql
from pprint import pprint


class Tool:
    @staticmethod
    def getConn():
        conn = pymysql.connect(host='127.0.0.1', port=3306,
                               user='root', password='root', database='sportsman')
        return conn

    @staticmethod
    def listTypeVerify(lt: List):
        if(type(lt) != list):
            raise Exception("Argument 'values' has type error")

    @staticmethod
    def listEleNumVerify(lt: List, num):
        for ele in lt:
            if len(ele) != num:
                raise Exception(
                    f"Argument 'values':{str(ele)} has number error")

    @staticmethod
    def jsonVerify(dt: Dict):
        if(type(dt) != dict):
            raise Exception("Argument isn't dict type")

    @staticmethod
    def sqlDataType(arg):
        if(type(arg) == int):
            return str(arg)
        else:
            return f"'{Tool.encodeText(arg)}'"

    @staticmethod
    def encodeText(word):
        return word.replace("'", "--")

    @staticmethod
    def decodeText(word):
        return word.replace("--", "'")

    @staticmethod
    def colNameFormat(colName: List):
        if len(colName) == 0:
            return ""
        else:
            res = []
            for ele in colName:
                res.append(ele)
            return "(" + ",".join(res) + ")"

    @staticmethod
    def valuesFormat(values):
        res = []
        for ele in values:
            ele = [Tool.sqlDataType(el) for el in ele]
            res.append("(" + ",".join(ele) + ")")

        return ",".join(res)

    @staticmethod
    def argsVerify(tableName, colNames, values):
        if(type(tableName) != str):
            raise Exception("Argument 'table' has type error")
        if(type(colNames) != list):
            raise Exception("Argument 'colnames' has type error")
        if(type(values) != list):
            raise Exception("Argument 'values' has type error")
        map(Tool.listTypeVerify, values)
        Tool.listEleNumVerify(values, len(colNames))

    @staticmethod
    def dictDataFormat(jsonData):

        res = []
        for key, Value in jsonData.items():
            item = key + " = " + Tool.sqlDataType(Value)
            res.append(item)
        return ",".join(res)


'''insert data into db
args: tableName:str ; colNames:list ; values:list[list[str or int]]
return boolen
raise: arguments have mistakes ,sql excute error
'''


def insert(tableName, colNames, values):
    Tool.argsVerify(tableName, colNames, values)

    conn = Tool.getConn()
    cursor = conn.cursor()
    sql = f"INSERT INTO {tableName} {Tool.colNameFormat(colNames)} VALUES {Tool.valuesFormat(values)};"
    try:
        cursor.execute(sql)
        conn.commit()
        return True
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return False
    finally:
        cursor.close()
        conn.close()


'''delete data into db
args: tableName:str ; whereCon:str
return boolen
raise: sql excute error ,sql excute error
'''


def delete(tableName, whereCon=""):
    sql = f"DELETE FROM {tableName} where {whereCon};"

    conn = Tool.getConn()
    cursor = conn.cursor()
    try:
        cursor.execute(sql)
        conn.commit()
        return True
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return False
    finally:
        cursor.close()
        conn.close()


'''select data from db
args: tableName:str ; colNames:list ; whereCon:str ; byCon:str
return turple
raise: arguments have mistakes ,sql excute error
'''


def select(tableName, colNames="*", whereCon="", byCon=""):
    if(colNames != "*"):
        Tool.listTypeVerify(colNames)

    conn = Tool.getConn()
    cursor = conn.cursor()

    where = "" if whereCon == "" else "WHERE "+whereCon

    sql = f"SELECT {','.join(colNames)} FROM {tableName} {where} {byCon};"
    # print(sql)
    try:
        cursor.execute(sql)
        data = cursor.fetchall()
        return data
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return None
    finally:
        cursor.close()
        conn.close()

# UPDATE examples_data SET listening = 10 WHERE examples =  'We were flying above the clouds.' AND word = 'above';


'''select data from db
args: tableName:str ; dictData:dict ; whereCon:str
return boolen
raise: arguments have mistakes
'''


def update(tableName, dictData, WhereCon="000"):
    Tool.jsonVerify(dictData)

    sql = f"UPDATE {tableName} SET {Tool.dictDataFormat(dictData)} where {WhereCon}"

    conn = Tool.getConn()
    cursor = conn.cursor()
    try:
        cursor.execute(sql)
        conn.commit()
        return True
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return False
    finally:
        cursor.close()
        conn.close()


def query(sql):
    conn = Tool.getConn()
    cursor = conn.cursor()
    try:
        cursor.execute(sql)
        data = cursor.fetchall()
        return data
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return None
    finally:
        cursor.close()
        conn.close()


def excute(sql):
    conn = Tool.getConn()
    cursor = conn.cursor()
    try:
        cursor.execute(sql)
        conn.commit()
        return True
    except pymysql.Error as e:
        conn.rollback()
        print(e.args[0], e.args[1])
        return False
    finally:
        cursor.close()
        conn.close()

# region insertDemo
# insert(tableName="examples_data",
#        colNames=["word", "examples"],
#        values=[
#            ['good', 'this is so good'],
#            ["good11", "this is so good awesome"]
#        ]
#        )
# endregion


# region selectDemo
# pprint(select(tableName="examples_data"))
# endregion


# region updateDemo

# update(tableName="examples_data",
#        dictData={"examples": "this is soooooooo good"},
#        WhereCon="word = 'good'")

# endregion


# region updateDemo
# delete("examples_data", "word = 'good'")
# endregion
