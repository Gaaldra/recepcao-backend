
import { Router } from 'express'
import FarmaciaController from './controllers/FarmaciaController'
import ErrorResponse from './middlewares/ErrorResponse'

const routes = Router()

routes.post('/farmacia/add', FarmaciaController.createFarmacia)

routes.use(ErrorResponse)

export { routes }