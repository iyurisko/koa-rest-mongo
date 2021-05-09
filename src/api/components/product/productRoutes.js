const Router = require('koa-router')
const controller = require('./productController')

const router = new Router({
    prefix: '/products'
})


router
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .post('/', controller.post)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete)
    

module.exports = router



