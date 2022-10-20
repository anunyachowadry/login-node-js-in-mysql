const express = require('express');
const bodyParser = require('body-parser');
const router=express();
const con = require('./dbconnection')
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/abc', function(req,res){
var Firstname = req.body.Firstname; 
var Lastname = req.body.Lastname;
var Gender =req.body.Gender;
var Email =req.body.Email;
var Phno = req.body.Phno;
var Address = req.body.Address;
var Password = req.body.Password;
var sql = `INSERT INTO anunya.register (Firstname,Lastname,Gender,Email,Phno,Address,Password) VALUES
     ("${Firstname}","${Lastname}","${Gender}","${Email}","${Address}","${Phno}","${Password}")`;
con.query(sql , function(err,result){
    if(!err){
        res.status(200).json(result) 
        console.log(result)
    }else{
        res.status(400).json({err})
        console.log(err)
    }
})

});

router.post('/login', (req,res)=> { 
 
var mail =req.body.Email;
var password = req.body.Password;

if(mail && password){
    console.log(mail)
    console.log(password)
var sql = 'SELECT * FROM register WHERE Email= ? AND Password=?' ;
con.query(sql ,[mail,password],function(err,result){
    console.log(sql)
    if(result.length>0){
        var data=JSON.parse(JSON.stringify(result));
        console.log(data)
        res.status(200).json({
            message:"logined"
        })
       
    }else{
        res.status(400).json({
            mess:"please check mail and password is correct"
        })
    }

            })
        }else{
            console.log('plase enter mail and password')

        }
});

  
router.put('/update', function(req,res) {
    
    con.query('UPDATE `register` SET `Firstname`=?,`Lastname`=?,`Gender`=?,`Phno`=?,`Address`=?,`Password`=?WHERE `Email`=?',
    [req.body.Firstname,req.body.Lastname,req.body.Gender,req.body.Phno,req.body.Address,req.body.Password,req.body.Email],function(err,result){
        if(!err){
            res.status(200).json(result)
            var result=JSON.parse(JSON.stringify(result))
            console.log(result)
        
        }else{
            res.status(400).json({err})
            console.log(err)
        }
    })
})

router.get('/tarak',function(req,res) {
    con.query('select * from anunya.register;',function(err,result,fields){
        if(!err){
            res.status(200).json(result)
            console.log(result)
        
        }else{
            res.status(400).json({err})
        }
    })
})

router.delete('/delete' , function(req,res){
  
    con.query('delete from `register` where `Email`=?',[req.body.Email],function(err,result){
        if(!err){
            res.status(200).json(result)
            var result=JSON.parse(JSON.stringify(result))
            console.log(result)
        
        }else{
            res.status(400).json({err})
            console.log(err)
        }
    })
})
module.exports=router



