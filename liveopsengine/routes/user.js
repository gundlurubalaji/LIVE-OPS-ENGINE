const express  =require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const {user}=require("../schema/user-schema")
const bcrypt = require("bcrypt");
const SECRET_CODE ="balajirock"
const salt =20;

router.post("/signup", async (req, res)=> {
    bcrypt.genSalt(salt, (saltErr, saltValue)=> {
        if(saltErr) {
            res.status(401).send("process not found")
        } else {
            bcrypt.hash(req.body.password, saltValue, (hashErr, hashValue)=> {
                if(hashErr) {
                    res.status(401).send("process not found");
                } else {
                    user.create({username: req.body.username, password: hashValue, email: req.body.email | "", mobile: req.body.mobile | ""}).then((user)=> {
                        res.status(200).send(user.username + " " + "suceessfully created");
                        // res.status(200).send(user) 

                    }).catch((err)=> {
                        res.status(400).send(err.message)
                    })
                }
            })
        }
    })
});

router.post("/signin", async (req, res)=> {
    
    user.findOne({username: req.body.username}).then((user)=> {
        if(!user) {
            res.status(401).send("not  exisiting a user")
        } else {
            if(!bcrypt.compareSync(req.body.password, user.password)) {
                res.status(401).send(" password does not match")
            } else {
                const token = jwt.sign({id: user._id, username: user.username}, SECRET_CODE);
                res.status(200).send({message: "login successfull", token: token});
            }
        }
    }).catch(()=> {

    })
});





module.exports = router;