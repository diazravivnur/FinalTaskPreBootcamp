//Setup Depedency
var express = require('express')
var router = express.Router();
var dbConnetion = require('../lib/db');


//Get Data kabupaten
router.get('/', function(req, res, next) {
    dbConnetion.query("SELECT * FROM kabupaten_tb", function(err, rows){
        if(err){
            req.flash("Error", err);
            //Render Error
            res.render("kabupaten", {data: ''})
            console.log(err)
        } else{
            //Render Data to Web
            res.render("kabupaten", {data:rows})
        }
    })
})



//Display add kabupaten Page
router.get('/add', function(req, res, next){
    //render to add.ejs
    res.render("kabupaten/add", {
        nama : "",
        diresmikan : "",
        photo : "",
    })
})


//Add new kabupaten
router.post('/add', function(req, res, next){
    
    let nama = req.body.nama;
    let diresmikan = req.body.diresmikan;
    let photo = req.body.photo;
    let errors = false;

    if(nama.length === 0 || diresmikan.length === 0 || photo.length === 0){
        //set Flash Message
        req.flash('Error', "Please enter kabupaten and Description");

        //render Response Error
        res.render('kabupaten/add', {
            nama : nama,
            diresmikan : diresmikan,
            photo : photo,
        })
    }
    //If No err
    if(!errors){
        var form_data = {
            nama : nama,
            diresmikan : diresmikan,
            photo : photo,
        }
        dbConnetion.query("INSERT INTO kabupaten_tb set ?", form_data, function(err, result){
            if(err){
                //Get Error Data
                req.flash("Error", err)

                //render to add.ejs
                res.render("kabupaten/add", {
                    nama : form_data.nama,
                    diresmikan : form_data.diresmikan,
                    photo : form_data.photo,
                })
            } else{
                req.flash("Success", "kabupaten Successfully Added");
                res.redirect("/kabupaten");
            }
        })
    }
})

//Edit Data kabupaten
router.get('/edit/(:id)', function(req, res, next){
    let id = req.params.id;

    //Get Id Data kabupaten
    dbConnetion.query("SELECT * FROM kabupaten where id = ?", id, function(err, rows, fields){
        if(err) throw err

        //if data Not Found
        if(rows.length <= 0){
            req.flash("err", "kabupaten not Found with")
            res.redirect("/kabupaten")
        }else {
            //Render Edit to edit.ejs
            res.render("kabupaten/edit", {
                id: rows[0].id,
                nama: rows[0].nama,
                diresmikan: rows[0].diresmikan,
                photo: rows[0].photo,
            })
        }
        

        //Store Data to Db
        if(!err){
            var form_data = {id: rows[0].id, 
                nama: rows[0].nama,
                diresmikan: rows[0].diresmikan,
                photo: rows[0].photo,
               }
            dbConnetion.query("UPDATE kabupaten SET = ? WHERE id = ?" [form_data, id], function(err, result){

                //if(err) throw error
                if(err){
                    req.flash("error", err)
                    res.render("kabupaten/edit", {
                        nama : req.body.nama,
                        diresmikan : req.body.diresmikan,
                        photo : req.body.photo,

                    })
                }
            })
        } else {
            req.flash("Success", "kabupaten successfully update");
            req.redirect("/kabupaten");
        }
    })
})


//delete kabupaten
router.get('/delete/(:id)', function(req, res, next){
    let id = req.params.id;
    dbConnetion.query("DELETE FROM kabupaten WHERE id = ?", id, function(err, result){
        //if Err
        if(err){
            req.flash("Error", err)
            res.redirect("/kabupaten")
        }else{
            req.flash("Success", "kabupaten successfully Deleted")
            res.redirect("/kabupaten")
        }
    })
})



module.exports = router;
