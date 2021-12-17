import { Router } from 'express'
import PharmacyController from './controllers/PharmacyController'
import ErrorResponse from './middlewares/ErrorResponse'

const routes = Router()

routes.post('/farmacia/add', PharmacyController.createPharmacy)
routes.get('/farmacia/get-all', PharmacyController.getAllPharmacies)
routes.get('/farmacia/get-one/:filter', PharmacyController.getOnePharmacy)
routes.put('/farmacia/update/:id', PharmacyController.updatePharmacy)

routes.use(ErrorResponse)

export { routes }
