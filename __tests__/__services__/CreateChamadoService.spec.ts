import mongoose from 'mongoose'
import { Farmacia, FarmaciaI } from '@schemas/Farmacia'
import { Chamado, ChamadoI } from '@schemas/Chamado'
import CreateFarmaciaService from '@services/CreateFarmaciaService'
import CreateChamadoService from '@services/CreateChamadoService'

describe('CreateChamadoService', () => {
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

  it('Should be able to create a new Chamado', async () => {
    const farmacia: FarmaciaI = {
      razao: 'Viva',
      fantasia: 'Manipulação',
      cnpj: '12345',
      telefones: [
        '2199887-5142'
      ]
    }

    const createFarmacia = new CreateFarmaciaService()

    const newFarmacia = await createFarmacia.execute(farmacia)

    const chamado: ChamadoI = {
      farmacia: newFarmacia._id,
      assunto: 'SNGPC',
      observacao: ['Cliente pediu para ligar as 15:00']
    }

    const createChamado = new CreateChamadoService()

    const newChamado = await createChamado.execute(chamado)

    expect(newChamado).toEqual(expect.objectContaining(chamado))
  })
})
