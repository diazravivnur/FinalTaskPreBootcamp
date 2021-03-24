//Setup Depedency
var express = require('express')
var router = express.Router();
var dbConnetion = require('../lib/db');


//Get Data provinsi
router.get('/', function(req, res, next) {
    dbConnetion.query("SELECT * FROM provinsi_tb", function(err, rows){
        if(err){
            req.flash("Error", err);
            //Render Error
            res.render("provinsi", {data: ''})
            console.log(err)
        } else{
            //Render Data to Web
            res.render("provinsi", {data:rows})
        }
    })
})



//Display add provinsi Page
router.get('/add', function(req, res, next){
    //render to add.ejs
    res.render("provinsi/add", {
        nama : "",
        diresmikan : "",
        photo : "",
        pulau : "",
    })
})


//Add new provinsi
router.post('/add', function(req, res, next){
    
    let nama = req.body.nama;
    let diresmikan = req.body.diresmikan;
    let photo = req.body.photo;
    let pulau = req.body.pulau;
    let errors = false;

    if(nama.length === 0 || diresmikan.length === 0 || photo.length === 0 || pulau.length === 0){
        //set Flash Message
        req.flash('Error', "Please enter provinsi and Description");

        //render Response Error
        res.render('provinsi/add', {
            nama : nama,
            diresmikan : diresmikan,
            photo : photo,
            pulau : pulau,
        })
    }
    //If No err
    if(!errors){
        var form_data = {
            nama : nama,
            diresmikan : diresmikan,
            photo : photo,
            pulau : pulau,
        }
        dbConnetion.query("INSERT INTO provinsi_tb set ?", form_data, function(err, result){
            if(err){
                //Get Error Data
                req.flash("Error", err)

                //render to add.ejs
                res.render("provinsi/add", {
                    nama : form_data.nama,
                    diresmikan : form_data.diresmikan,
                    photo : form_data.photo,
                    pulau : form_data.pulau,
                })
            } else{
                req.flash("Success", "provinsi Successfully Added");
                res.redirect("/provinsi");
            }
        })
    }
})

//Edit Data provinsi
router.get('/edit/(:id)', function(req, res, next){
    let id = req.params.id;

    //Get Id Data provinsi
    dbConnetion.query("SELECT * FROM provinsi_tb where id = ?", id, function(err, rows, fields){
        if(err) throw err

        //if data Not Found
        if(rows.length <= 0){
            req.flash("err", "provinsi not Found with")
            res.redirect("/provinsi")
        }else {
            //Render Edit to edit.ejs
            res.render("provinsi/edit", {
                id: rows[0].id,
                nama: rows[0].nama,
                diresmikan: rows[0].diresmikan,
                photo: rows[0].photo,
                pulau: rows[0].pulau,
               
            })
        }
        

        //Store Data to Db
        if(!err){
            var form_data = {id: rows[0].id, 
                nama: rows[0].nama,
                diresmikan: rows[0].diresmikan,
                photo: rows[0].photo,
                pulau: rows[0].pulau,
               }
            dbConnetion.query("UPDATE provinsi_tb SET = ? WHERE id = ?" [form_data, id], function(err, result){

                //if(err) throw error
                if(err){
                    req.flash("error", err)
                    res.render("provinsi/edit", {
                        nama : req.body.nama,
                        diresmikan : req.body.diresmikan,
                        photo : req.body.photo,
                        pulau : req.body.pulau
                    })
                }
            })
        } else {
            req.flash("Success", "provinsi successfully update");
            req.redirect("/provinsi");
        }
    })
})


//delete provinsi
router.get('/delete/(:id)', function(req, res, next){
    let id = req.params.id;
    dbConnetion.query("DELETE FROM provinsi_tb WHERE id = ?", id, function(err, result){
        //if Err
        if(err){
            req.flash("Error", err)
            res.redirect("/provinsi")
        }else{
            req.flash("Success", "provinsi successfully Deleted")
            res.redirect("/provinsi")
        }
    })
})



module.exports = router;
