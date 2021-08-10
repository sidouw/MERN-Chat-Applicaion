const express = require('express')
const fs = require('fs')
const router = express.Router()
const User = require('../models/user')
const auth = require('../Utils/auth')
const path = require("path")



router.post('/users/login',async (req,res)=>{
    
    try {
        const user = await User.findByCred(req.body.username,req.body.password)
        const token = await user.genAuthToken()
        res.status(200).send({user,token})
    } catch (error) {
        res.status(400).send({error})
    }
})

router.post('/users/logout',auth,async (req,res)=>{
    try {
        req.user.tokens =req.user.tokens.filter((token)=> req.token !== token)
        await req.user.save()
        res.status(200).send({user:req.user})
    } catch (error) {
        res.status(400).send({error})
    }
})

router.post('/users/signup',async (req,res)=>{

    try {
        const user = new User(req.body)
        const token = await user.genAuthToken()
        res.status(201).send({user,token})
    } catch (error) {
        res.status(400).send({error:'email already in use'})
    }
})

router.patch('/users',auth,async(req,res)=>{
    const allowedupdates = ['username','password','state']
    
    const updates = Object.keys(req.body)
    const isValid = updates.every(update=> allowedupdates.includes(update))
    if(!isValid){
        
        return res.status(400).send()
    }
    try {

        updates.forEach((update)=>req.user[update]= req.body[update])

        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/auth',auth,(req,res)=>{
    res.send(req.user)
})

//Get friend Requsts
router.get('/users/f',auth,async (req,res)=>{

    try {
        await req.user.populate('friendrequestes').execPopulate()
        res.send(req.user.friendrequestes)
    } catch (error) {
        res.status(400).send({error})
    }

})

//send Friend Requst
router.post('/users/f',auth,async (req,res)=>{

    try {
        let user = await User.findOne({username:req.body.id})
        if (user) {
            if(user.friendrequestes.includes(req.user._id)){
                return res.send({error:'request already sent'})
            }else if(user.contacts.includes(req.user._id)){
                return res.send({error:'already Friends'})
            }
            user.friendrequestes.push(req.user._id)
            await user.save()
            res.send({ok:'sent'})
        }else{
            res.send({error:'User Not Found'})
        }
        

    } catch (error) {
        res.status(400).send({error})
    }

})


router.get('/users/image',(req,res)=>{
    res.sendFile(path.join(path.dirname(__dirname),'public','images',req.query.img+'.jpg'))
})
router.get('/users/:id',async (req,res)=>{
    try {
        const user =await User.findOne({_id:req.params.id})
        if(! user){
            return  res.status(400).send({error:'User Not Found'})
        }
        res.send(user)
    } catch (error) {
        res.status(400).send({error})
    }

})

router.get('/users',async (req,res)=>{
    try {
        const user =await User.find()
        if(! user){
            return  res.status(400).send({error:'User Not Found'})
        }
        res.send(user)
    } catch (error) {
        res.status(400).send({error})
    }

})

//accept decline Friend Requsts 
router.post('/users/f/:id',auth,async (req,res)=>{
    try {
        req.user.friendrequestes = req.user.friendrequestes.filter(friend=>friend!=req.params.id)
        if(req.body.type === 'A'){
            const user = await User.findById(req.params.id)
            user.contacts.push(req.user._id)
            await user.save()
            req.user.contacts.push(req.params.id)
        }
        await req.user.save()
        res.send({ok:'done'})
    } catch (error) {
        res.status(400).send({error})
    }

})

//get friends
router.get('/users/f/:id',auth,async (req,res)=>{
    try {
        const users =await User.find({contacts:req.params.id})
        if(! users){
            return  res.status(400).send({error:'User Not Found'})
        }
        res.send(users)
    } catch (error) {
        res.status(400).send({error})
    }

})

router.delete('/users/f/:id',auth,async (req,res)=>{
    try {
        if (!req.user.contacts.includes(req.params.id)) {
           return res.send({erroe:'Already Deleted'})
        }

        req.user.contacts = req.user.contacts.filter(friend=>friend!=req.params.id)
        const user = await User.findById(req.params.id)
        user.contacts = user.contacts.filter(friend=>friend!=req.user._id)
        
        await user.save()
        await req.user.save()

        res.send({ok:'done'})
    } catch (error) {
        res.status(400).send({error})
    }

})

router.delete('/users',auth,async (req,res)=>{
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(400).send()
    }


})



router.post('/users/image',auth,async (req,res)=>{
    try {
        const img = req.body.image
        var data = img.replace(/^data:image\/\w+;base64,/, "")
        var buf = Buffer.from(data, 'base64')
        fs.writeFileSync(path.join(path.dirname(__dirname),'public','images',req.user._id+'.jpg'),buf)
        req.user.photo_url = true
        await req.user.save()
        res.send()
    } catch (error) {
        console.log(error);
        res.status(400).send()
    }
})
module.exports = router