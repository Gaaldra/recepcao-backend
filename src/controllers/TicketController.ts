import InvalidRequest from '@errors/InvalidRequest'
import { TicketService } from '@services/TicketService'
import { NextFunction, Request, Response } from 'express'
import { TicketT } from 'src/entities/Ticket'

class TicketController {
  async createTicket (request: Request, response: Response, next: NextFunction) {
    try {
      const ticket: TicketT = request.body
      const newTicket = new TicketService(ticket)
      const result = await newTicket.create()
      response.send(JSON.stringify(result))
    } catch (error) {
      return next(error)
    }
  }

  async closeTicket (request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params
      const result = TicketService.closeTicket(id)
      return response.send(JSON.stringify(result))
    } catch (error) {
      return next(error)
    }
  }

  async getAll (request: Request, response: Response, next: NextFunction) {
    try {
      const result = await TicketService.getAll()
      return response.send(JSON.stringify(result))
    } catch (error) {
      return next(error)
    }
  }

  async getAllByStatus (request: Request, response: Response, next: NextFunction) {
    try {
      const { status } = request.params
      if (!(status.includes('open') || status.includes('closed'))) return next(new InvalidRequest(''))
      const result = await TicketService.getAllByStatus(status)
      return response.send(JSON.stringify(result))
    } catch (error) {
      return next(error)
    }
  }
}

export default new TicketController()
