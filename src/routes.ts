import TicketController from '@controllers/TicketController'
import { Router } from 'express'
import CompanyController from './controllers/CompanyController'
import ErrorResponse from './middlewares/ErrorResponse'

const routes = Router()

// Get routes
routes.get('/farmacia/get-all', CompanyController.getAllPharmacies)
routes.get('/farmacia/get-one/:id', CompanyController.getOnePharmacy)
routes.get('/farmacia/get-some/:filter', CompanyController.getSomePharmacy)
routes.get('/tickets/get-all', TicketController.getAll)
routes.get('/tickets/get-all/:status', TicketController.getAllByStatus)

// Post routes
routes.post('/farmacia/add', CompanyController.createPharmacy)
routes.post('/tickets/add', TicketController.createTicket)
routes.post('/tickets/close/:id', TicketController.closeTicket)

// Put routes
routes.put('/farmacia/update/:id', CompanyController.updatePharmacy)

// Next Function
routes.use(ErrorResponse)

export { routes }
