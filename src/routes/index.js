
const combineRouters = require('koa-combine-routers');


const productRoutes = require('../api/components/product/productRoutes')


/*Register all our routes */
router = combineRouters(
    productRoutes
)

module.exports = router


