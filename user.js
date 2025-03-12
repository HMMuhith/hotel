import express from 'express'
import User from './ProfileModel.js'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { Admin, Auth } from './auth.js'

const router = express.Router()

const error = {}

router.post('/signup', async (req, res) => {
    try {
        const { name, email, phone, password, confirm_password } = req.body
        if (validator.isEmpty(name)) {
            error.name = `name field required`
            return res.status(401).json({ error: error.name })
        }
        if (!validator.isLength(name, { min: 4, max: 30 })) {
            error.name = `value must be within 4 to 30 characters`
            return res.status(401).json({ error: error.name })
        }
        if (validator.isEmpty(email)) {
            error.email = `Email field required`
            return res.status(401).json({ error: error.email })
        }

        if (!validator.isEmail(email)) {
            error.email = `Email must include @ character`
            return res.status(401).json({ error: error.email })
        }
        if (validator.isEmpty(phone)) {
            error.phone = `phone field required`
            return res.status(401).json({ error: error.phone })
        }
        if (!validator.isLength(phone, { min: 10, max: 10 })) {
            error.phone = `phone number 10 digits required`
            return res.status(401).json({ error: error.phone })
        }
        if (validator.isEmpty(password)) {
            error.password = `password field required`
            return res.status(401).json({ error: error.password })
        }

        if (!validator.isLength(password, { min: 4, max: 15 })) {
            error.password = `password must be between 4 to 15 characters`
            return res.status(401).json({ error: error.password })
        }
        if (validator.isEmpty(confirm_password)) {
            error.password = `confirm_password field required`
            return res.status(401).json({ error: error.password })
        }
        if (!validator.equals(password, confirm_password)) {
            error.confirm_password = `password must match`
            return res.status(401).json({ error: error.confirm_password })
        }



        const oldprofile = await User.findOne({ email: req.body.email })
        if (oldprofile) {
            return res.status(400).json({ error: `email already exists` })
        }
        const user = new User(req.body)
        return bcrypt.hash(password, 10, async (err, hash) => {
            if (err) throw new err
            user.password = hash
            const result = await user.save()
            res.status(200).json({ user: result })
        })

    }
    catch (err) {

        res.status(404).json({ error: `${err}` })
    }
    // let error=User.validate()
    //     assert.equal(error.errors['phone'].message,'minimum 6 digitrequired')
})


// **************************************************Login*********************************************


router.post('/login', async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ error: `user not found` })
    }
    if (user && await user.match(password)) {
        req.session.isLoggedin = true
        req.session.user = user
        req.session.user.id = user._id
        req.session.user.name = user.name
        req.session.save()
        console.log()

        return res.status(200).json({ success: `Loggedin successfully`, user: req.session.user.id, name: req.session.user.name })
    }

    return res.status(404).json({ error: `unauthorized user` })

}
)
router.post('/logout', (req, res) => {
    try
    {
        req.session.destroy()
        res.status(200).json({ success: `cookies deleted` })
    }
  catch (error)  {
res.status(400).json(error)
    }
})

router.put('/update/:id', Auth, async (req, res) => {
    const { name, type, city, address, desc, photos, rating, rooms, cheapestPrice } = req.body
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $set: { name, type, city, address, desc, photos, rating, rooms, cheapestPrice } }, { new: true })
        return res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: `Update went wrong` })
    }
})

router.delete('/:id', Admin, async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({ error: `ID deleted successfully` })
})


export default router