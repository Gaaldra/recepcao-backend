import { Router } from 'express'
import FarmaciaController from './controllers/FarmaciaController'
import ErrorResponse from './middlewares/ErrorResponse'

const routes = Router()

routes.post('/farmacia/add', FarmaciaController.createFarmacia)
routes.get('/farmacia/get-all', FarmaciaController.getAllFarmacias)
routes.get('/farmacia/get-one/:filter', FarmaciaController.getOneFarmacia)
routes.put('/farmacia/update/:id', FarmaciaController.updateFarmacia)

routes.use(ErrorResponse)

export { routes }
