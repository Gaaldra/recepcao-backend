import { getRepository } from 'typeorm'
import { PhoneCompany } from 'src/entities/PhoneCompany'
import { Company } from '../entities/Company'
import { Ticket } from 'src/entities/Ticket'

export const CompanyRepository = () => {
  return getRepository(Company)
}

export const PhonesRepository = () => {
  return getRepository(PhoneCompany)
}

export const TicketRepository = () => {
  return getRepository(Ticket)
}
