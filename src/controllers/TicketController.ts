import { TicketService } from '@services/TicketService'
import { NextFunction, Request, Response } from 'express'
import { TicketT } from 'src/entities/Ticket'

class TicketController {
  async create (request: Request, response: Response, next: NextFunction) {
    const ticket: TicketT = request.body
    const newTicket = new TicketService(ticket)
    const result = await newTicket.create()
    response.send(JSON.stringify(result))
  }

  async getAll (request: Request, response: Response, next: NextFunction) {
    const result = await TicketService.getAll()
    response.send(JSON.stringify(result))
  }
}

export default new TicketController()
