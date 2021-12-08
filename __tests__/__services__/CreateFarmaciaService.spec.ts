import { Chamado } from '@schemas/Chamado'
import { Farmacia, FarmaciaI } from '@schemas/Farmacia'
import CreateFarmaciaService from '@services/CreateFarmaciaService'
import mongoose from 'mongoose'

describe('CreateFarmaciaService', () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URL) throw new Error('MongoDB server not initialized')

    await mongoose.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    await Farmacia.deleteMany({})
    await Chamado.deleteMany({})
  })

  it('Deve ser possivel criar uma farmacia', async () => {
    const farmacia: FarmaciaI = {
      razao: 'Viva',
      fantasia: 'Manipulação',
      cnpj: '12345',
      telefones: [
        '2199887-5142'
      ]
    }

    const createFarmacia = new CreateFarmaciaService()

    const existFarmacia = await createFarmacia.execute(farmacia)

    expect(existFarmacia).toEqual(
      expect.objectContaining({
        razao: 'Viva',
        fantasia: 'Manipulação',
        cnpj: '12345'
      })
    )
  })

  it('Não deve ser possivel criar uma farmacia que já existe', async () => {
    const farmacia: FarmaciaI = {
      razao: 'Viva',
      fantasia: 'Manipulação',
      cnpj: '12345',
      telefones: [
        '2199887-5142'
      ]
    }
    await Farmacia.create(farmacia)

    const createFarmacia = new CreateFarmaciaService()
    await expect(createFarmacia.execute(farmacia)).rejects.toThrow()
  })
})
