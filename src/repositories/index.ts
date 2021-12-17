import { getRepository } from 'typeorm'
import { PhonePharmacy } from 'src/entity/PhonePharmacy'
import { Pharmacy } from '../entity/Pharmacy'

export const PharmacyRepository = () => {
  return getRepository(Pharmacy)
}

export const PhonesRepository = () => {
  return getRepository(PhonePharmacy)
}
