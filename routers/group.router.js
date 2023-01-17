const { Group, validate } = require('./../models/group.model')
const express = require('express')
const router = express.Router()
const _ = require('lodash')
const { cookieJwtAuth } = require('./../middleware/cookieJwtAuth.middleware')

router.post('/', cookieJwtAuth, async function(req, res){

    const { error } = validate(req.body)
    
    if(error)
        return res.status(400).send(error.details[0].message)
    
    try{
        if(req.user.status === 1){
            let group = new Group(_.pick(req.body, ['group_name',]))
            let newgroup = await group.save()
            return res.render('super_admin_main', {
                name : req.user.name
            })
        } else {
            return res.send('This user do not create new group')
        }
    }catch(err){
        return res.status(404).send("Quyidagi gurihni tashkil qilishni imkoni bo'lmadi!");
    }

});

router.get('/', cookieJwtAuth, async function(req, res){

    if (req.user.status === 1) {
        return res.render('super_admin_main', {
            name : req.user.name
        })
    } else {
        return res.render('login', {

        })
    }

});

router.get('/user', cookieJwtAuth, async function(req, res){

    if (req.user.status === 1) {
        return res.render('super_admin_main_create_user', {
            name : req.user.name
        })
    } else {
        return res.render('login', {

        })
    }

});

router.get('/grouplist', async(req, res) => {
    try {
        const grouplist = await Group.find();
        return res.send(grouplist);
    } catch (err) {
        return res.status(404).send("Xatolik yuzaga keldi");
    }
})

module.exports = router;