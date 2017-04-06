/**
 * Created by yiweiguo on 2017/4/6.
 */

var schedule=require("node-schedule");
var ticketsService=require("../service/tickets")
var config=require("../config")
var sms=require("../utils/smsUtils")
var log4js = require('log4js');
var logger = log4js.getLogger('normal');

var staticSell=0;
var ticketsSchedule = schedule.scheduleJob('*/1 * * * *', function(){
    console.log("定时任务:"+new Date());
    logger.info("定时任务:"+new Date());
    console.log("当前价格:"+staticSell);
    logger.info("当前价格:"+staticSell);
    ticketsService.getTickers(function (err,price) {
        if(err){
            console.log(err);
            logger.error(err);
        }
        else{
            if(Math.abs(staticSell-price)>config.SELL_DIFF.LTC){
                staticSell=price;
                console.log("设置最新的staticSell为"+staticSell);
                logger.info("设置最新的staticSell为"+staticSell);
                var content="莱特币:"+staticSell;
                sms.sendSms(content,config.phone)
            }
        }
    })
    
});

exports.ticketsSchedule=ticketsSchedule;