const express = require('express')
const app = express()
const port = 3001

//Main
const proxy = require('pass-cors')
app.use('/proxy', (req,res)=>{
    data=req.query
    if(data.url){
        n=1
        uri = ''
        for(param in data){
            if(n==1){
                uri+=data[param]
            }else{
                uri+=`&${param}=${data[param]}`
            }
            n+=1
        }
        // console.log(uri);
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Credentials', true)
        try{
            url = new URL(uri)
            request(uri).pipe(res)
        }catch(err){
          console.log(err);
        }
    }else{
        res.setHeader("Content-Type","application/json")
        res.json({
            "error": "404",
            "desc": "Enter URL in the format /proxy?url='yourURLHere'"
        })
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})