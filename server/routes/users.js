
async function userRoutes(fastify,options,done){
    fastify.get('/users',(req,reply)=>{
        reply.send("users")
    })
}

module.exports = userRoutes;