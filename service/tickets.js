/**
 * Created by yiweiguo on 2017/4/6.
 */
var superAgent=require("superagent");
var config=require("../config")

exports.getTickers=function (callback) {
    superAgent
        .get(config.TICKETS_API.LTC)
        .set('Accept', 'application/json')
        .end(function(err,res){
            if(res){
                if (res.text) {
                    var json={}
                    try {
                        json=JSON.parse(res.text)
                    }
                    catch (e){
                        throw e;
                    }
                    console.log("实时价格:"+json.sell);
                    callback(null,json.sell);
                } else {
                    callback(err,null);
                }
            }
            else {
                callback(err,null);
            }

        });
}