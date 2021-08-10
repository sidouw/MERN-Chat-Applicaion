const {connect} = require('mongoose')

connect(process.env.DATABASE_URL,{
    useNewUrlParser : true,
    useCreateIndex :true,
    useUnifiedTopology: true
}
).then(()=>{
    console.log('conected to db',process.env.DATABASE_URL)
}).catch(()=>{
    console.log('Failed To connect to db on ',process.env.DATABASE_URL)
})