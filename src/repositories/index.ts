import { getRepository } from 'typeorm'
import { PhonePharmacy } from 'src/entities/PhonePharmacy'
import { Pharmacy } from '../entities/Pharmacy'
import Ticket from 'src/entities/Ticket'

export const PharmacyRepository = () => {
  return getRepository(Pharmacy)
}

export const PhonesRepository = () => {
  return getRepository(PhonePharmacy)
}

export const TicketRepository = () => {
  return getRepository(Ticket)
}
