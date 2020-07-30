var express = require('express');
var router = express.Router();
var audit=require('../models/audit')
var appkeycheck=require('../middleware/appkeyAuth')
var weatherreportjson=require('../data/report.json')

/**weather report data from json file*/
router.get('/weather',appkeycheck ,async(req, res, next)=>{
  try{
    var date = new Date().getDate()
    var isPrimeDate=await testPrimeNumber(date)
    const newAudit = new audit({
      appkey:req.query.appkey,
      api:req.originalUrl,
      ip: req.headers['x-real-ip']||req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      isPrimeDate:isPrimeDate
    });
    const saveAudit = await newAudit.save();
    if(isPrimeDate){
      res.json( weatherreportjson);
    }else{
      res.json( {msg:"Date is not prime so no date"});
    }
  }catch(err){
    console.error(err)
    res.status(500)
    res.json( {msg:"Something get wrong, Please try again"});
  }
  
});

//Test date is prime function
function testPrimeNumber(currDate){
  if(currDate==1){
    return false
  }else if(currDate==2){
    return true
  }else{
    for(let i=2;i<Math.floor(currDate/2)+1;i++){
      if(currDate%i==0){
        return false
      }
    }
    return true; 
  }
}

module.exports = router;
