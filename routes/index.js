var express = require('express');
var router = express.Router();
var axios=require('axios')
var audit=require('../models/audit')
var appkeycheck=require('../middleware/appkeyAuth')
var weatherreportjson=require('../data/report.json')

/**
 * weather report data from json file
 * method [GET]
 * @param appkey
*/
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

/**
 *  live weather report data from openweathermap
 *  method [GET]
 *  @param appkey
 */
router.get('/liveweather',appkeycheck ,async(req, res, next)=>{
  try{
    let date = new Date().getDate()
    let isPrimeDate=await testPrimeNumber(date)
    const response=await axios.get('https://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=439d4b804bc8187953eb36d2a8c26a02')
    if(response.status===200){
      const newAudit = new audit({
        appkey:req.query.appkey,
        api:req.originalUrl,
        ip: req.headers['x-real-ip']||req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        isPrimeDate:isPrimeDate
      });
      const saveAudit = await newAudit.save();
      if(isPrimeDate){
        res.json( response.data);
      }else{
        res.json( {msg:"Date is not prime so no date"});
      }
    }else{
      res.status(500)
      res.json( {msg:"Remote Server not working, Please try again"});
    }
  }catch(err){
    console.error(err)
    res.status(500)
    res.json( {msg:"Something get wrong, Please try again"});
  }
  
});
/**
 * find date is prime function
 * @param {*} currDate 
 */
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
