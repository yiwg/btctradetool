var express = require('express');
var router = express.Router();
var ticketsService=require("../service/tickets")
var config=require("../config")
var sms=require("../utils/smsUtils")
var staticSell=0;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getTickers', function(req, res, next) {
  console.log("this is routes.index.getTickers");
  console.log("当前价格:"+staticSell);
  ticketsService.getTickers(function (err,price) {
      if(err){
        console.log(err);
      }
      else{
          if(Math.abs(staticSell-price)>config.SELL_DIFF.LTC){
            staticSell=price;
            console.log("设置最新的staticSell为"+staticSell);
            var content="莱特币:"+staticSell;
            sms.sendSms(content,config.phone)
          }
      }
  })
  
});
module.exports = router;

