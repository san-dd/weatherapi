const {APPKEY} =require ('../config/appConfig');

//appkey check middlewear
module.exports=(req, res, next) => {
  const appkey = req.query.appkey?req.query.appkey:req.body.appkey?req.body.appkey:null
  console.log(appkey)
  if (!appkey){
    return res.status(401).json({ msg: 'Please provide appkey' });
  }else if(appkey!=APPKEY){
    return res.status(401).json({ msg: 'Invalid appkey' });
  }else{
    next();
  }
};