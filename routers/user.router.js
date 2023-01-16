const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const { cookieJwtAuth } = require('./../middleware/cookieJwtAuth.middleware')
const { User } = require('./../models/user.model')

router.post('/',  async (req, res) => {
    try{

        const salt = await bcrypt.genSalt()
        req.body.password = await bcrypt.hash(req.body.password, salt)

        let user = new User(req.body)
        let new_user = await user.save()

        return res.send(_.pick(new_user, ['_id', 'name']))

    } catch(err) {
        return res.send("Tizimda xatolik yuzaga keldi")
    }
    
})

router.post('/login', async (req, res) => {

    let user = await User.findOne({ user_name: req.body.user_name });
    if (!user)
        return res.render('login', {
            message: 'Email yoki parol noto\'g\'ri'
        })

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword)
        return res.render('login', {
            message: 'Email yoki parol noto\'g\'ri'
        })

    const token = user.generateAuthToken();

    res.cookie("token", token, {
        httpOnly: true,
        // secure: true,
        // maxAge: 1000000,
        // signed: true
    })

    if (user.status === 3) {
        return res.render('main', {
            name: user.name
        })
    }

    if (user.status === 2) {
        return res.render('admin_main', {
            name: user.name
        })
    }

    if (user.status === 1) {
        return res.render('super_admin_main', {
            name: user.name
        })
    }

    return res.render('login', {})

})

router.delete('/delete', cookieJwtAuth, async (req, res) => {
    let user = await User.findByIdAndRemove(req.query.id);
    if (!user)
        return res.status(400).send({ok: false});

    return res.send({ok: true});
})

module.exports = router;