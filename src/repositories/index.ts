import { getRepository } from 'typeorm'
import { TelefoneFarmacia } from 'src/entity/TelefoneFarmacia'
import { Farmacia } from '../entity/Farmacia'

export const FarmaciaRepository = () => {
  return getRepository(Farmacia)
}

export const TelefonesRepository = () => {
  return getRepository(TelefoneFarmacia)
}
