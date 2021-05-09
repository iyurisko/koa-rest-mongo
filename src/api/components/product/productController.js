const Service = require('./productServices')

module.exports = {

    getAll: async (ctx) => {

        return Service.findAll(ctx.query)
            .then(result => {
                ctx.body = {
                    data: result,
                    status: "OK",
                    message: "get success"
                }
                ctx.status = 200
            })
            .catch(error => {
                ctx.status = 400
                ctx.body = error
            });
    },

    getById: async (ctx) => {
        let id = ctx.request.params.id

        return Service.findOneById(id)
            .then(result => {
                ctx.body = {
                    data: result,
                    status: "OK",
                    message: "get success"
                }
                ctx.status = 200
            })
            .catch(error => {
                ctx.body = error
                console.log({error})
                sdk.log.error(error)
            });
    },

    post: async (ctx) => {
        let data = ctx.request.body

        return Service.insertOne(data)
            .then(result => {
                ctx.body = {
                    data: result,
                    status: "OK",
                    message: "Create success"
                }
                ctx.status = 200
            })
            .catch(error => {
                ctx.body = error
            });
    },

    update: async (ctx) => {
        let id = ctx.request.params.id
        let data = ctx.request.body

        return Service.updateOne(id, data)
            .then(result => {
                ctx.body = {
                    data: result,
                    status: "OK",
                    message: "Updated success"
                }
                ctx.status = 200
            })
            .catch(error => {
                ctx.body = error
            });
    },

    delete: async (ctx) => {
        let id = ctx.request.params.id

        console.log(id)
        return Service.deleteOne(id)
            .then(result => {
                ctx.body = {
                    data: result,
                    status: "OK",
                    message: "delete success"
                }
                ctx.status = 200
            })
            .catch(error => {
                ctx.status = 200
                ctx.body = error
            });
    }
}