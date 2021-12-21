import TicketController from '@controllers/TicketController'
import { Router } from 'express'
import PharmacyController from './controllers/PharmacyController'
import ErrorResponse from './middlewares/ErrorResponse'

const routes = Router()

// Get routes
routes.get('/farmacia/get-all', PharmacyController.getAllPharmacies)
routes.get('/farmacia/get-one/:id', PharmacyController.getOnePharmacy)
routes.get('/farmacia/get-some/:filter', PharmacyController.getSomePharmacy)
routes.get('/tickets/get-all', TicketController.getAll)
routes.get('/tickets/get-all/:status', TicketController.getAllByStatus)

// Post routes
routes.post('/farmacia/add', PharmacyController.createPharmacy)
routes.post('/tickets/add', TicketController.createTicket)
routes.post('/tickets/close/:id', TicketController.closeTicket)

// Put routes
routes.put('/farmacia/update/:id', PharmacyController.updatePharmacy)

// Next Function
routes.use(ErrorResponse)

export { routes }
