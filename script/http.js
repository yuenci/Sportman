import { Conf } from "./config"

class Http {

    // get
    static getRequeste(url, JsonData) {
        return new Promise(
            function (resolve) {
                $.ajax({
                    type: "GET",
                    url: Conf.serviceIP + url,
                    data: JsonData,
                    success: function (data) {
                        resolve(data);
                    },
                    contentType: "application/json",
                    dataType: 'json'
                });
            }
        )
    }

    //post
    static postRequeste(url, jsonData) {
        return new Promise(
            function (resolve) {
                $.ajax({
                    type: "POST",
                    url: Conf.serviceIP + url,
                    data: JSON.stringify(jsonData),
                    success: function (data) {
                        resolve(data);
                    },
                    contentType: "application/json",
                    dataType: 'json'
                });
            }
        )
    }





    //put
    static putRequeste(url, jsonData) {
        return new Promise(
            function (resolve) {
                $.ajax({
                    type: "PUT",
                    url: Conf.serviceIP + url,
                    data: JSON.stringify(jsonData),
                    success: function (data) {
                        resolve(data);
                    },
                    contentType: "application/json",
                    dataType: 'json'
                });
            }
        )
    }



    // patch
    static patchRequeste(url, JsonData) {
        return new Promise(
            function (resolve) {
                $.ajax({
                    type: "PATCH",
                    url: Conf.serviceIP + url,
                    // contentType: "application/x-www-form-urlencoded",
                    data: JSON.stringify(JsonData),
                    success: function (data) {
                        resolve(data);
                    },
                    contentType: "application/json",
                    dataType: 'json'
                });
            }
        )
    }




    //delete
    static deleteRequeste(url, JsonData) {
        return new Promise(
            function (resolve) {
                $.ajax({
                    type: "DELETE",
                    url: Conf.serviceIP + url,
                    data: JSON.stringify(JsonData),
                    success: function (data) {
                        resolve(data);
                    },
                    contentType: "application/json",
                    dataType: 'json'
                });
            }
        )
    }
}

export { Http };