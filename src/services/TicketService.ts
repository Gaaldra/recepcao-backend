import InvalidRequest from '@errors/InvalidRequest'
import { Pharmacy } from 'src/entities/Pharmacy'
import { Ticket, TicketT } from 'src/entities/Ticket'
import { PharmacyRepository, TicketRepository } from 'src/repositories'
import { IsNull, Not, UpdateResult } from 'typeorm'

export class TicketService implements TicketT {
  observation: string
  pharmacy: Pharmacy
  tecnico: string
  topic: string
  private ticketRepository = TicketRepository()

  constructor (ticket: TicketT) {
    this.topic = ticket.topic
    this.observation = ticket.observation
    this.tecnico = ticket.tecnico
    this.pharmacy = ticket.pharmacy
    this.isValid()
  }

  private isValid () {
    if (!this.observation) throw new InvalidRequest('Missing observation')
    if (!this.pharmacy) throw new InvalidRequest('Missing pharmacy')
    if (!this.tecnico) throw new InvalidRequest('Missing tecnico')
    if (!this.topic) throw new InvalidRequest('Missing topic')
  }

  async create (): Promise<Ticket> {
    if (!(await PharmacyRepository().findOne(this.pharmacy))) throw new InvalidRequest('Company doesn\'t exists')
    const ticket = this.ticketRepository.create({
      observation: this.observation,
      pharmacy: this.pharmacy,
      tecnico: this.tecnico,
      topic: this.topic
    })
    const result = this.ticketRepository.save(ticket)
    return result
  }

  static async closeTicket (id: string): Promise<UpdateResult> {
    const repo = TicketRepository()
    const result = repo.update({ id: id }, { closedAt: new Date().toUTCString() })
    return result
  }

  static async getAll (): Promise<Ticket[]> {
    const repo = TicketRepository()
    return await repo.find({ relations: ['pharmacy'] })
  }

  static async getAllByStatus (status: string): Promise<Ticket[]> {
    const repo = TicketRepository()
    if (status.includes('open')) {
      return await repo.find({
        where: { closedAt: IsNull() },
        relations: ['pharmacy']
      })
    }
    return await repo.find({ where: { closedAt: Not(IsNull()) }, relations: ['pharmacy'] })
  }
}
