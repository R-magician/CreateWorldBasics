let request = require('request');
let url = 'https://www.dytt8.net/index2.htm'
request.get(url,(err,response,body)=>{
    console.log(err,response,body)
})