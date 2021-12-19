import { Router } from 'express'
import PharmacyController from './controllers/PharmacyController'
import ErrorResponse from './middlewares/ErrorResponse'

const routes = Router()

// Get routes
routes.get('/farmacia/get-all', PharmacyController.getAllPharmacies)
routes.get('/farmacia/get-one/:id', PharmacyController.getOnePharmacy)
routes.get('/farmacia/get-some/:filter', PharmacyController.getSomePharmacy)

// Post routes
routes.post('/farmacia/add', PharmacyController.createPharmacy)

// Put routes
routes.put('/farmacia/update/:id', PharmacyController.updatePharmacy)

// Next Function
routes.use(ErrorResponse)

export { routes }
