
import { Farmacia, FarmaciaI } from '@schemas/Farmacia'
import { Document } from 'mongoose'
import { DuplicateError } from '../errors/DuplicateError'

class CreateFarmaciaService {
  async execute (farmacia: FarmaciaI): Promise<Document> {
    const existeFarmacia = await Farmacia.findOne({ farmacia })
    if (existeFarmacia) throw new DuplicateError('Farmacia já existe')
    const novaFarmacia = await Farmacia.create(farmacia)
    return novaFarmacia
  }
}

export default CreateFarmaciaService
