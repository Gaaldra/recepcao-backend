import mongoose from 'mongoose'
import FarmaciaController from '@controllers/FarmaciaController'
import CreateFarmaciaService from '@services/CreateFarmaciaService'
import { Farmacia, FarmaciaI } from '@schemas/Farmacia'
import { getMockReq, getMockRes } from '@jest-mock/express'

describe('FarmaciaController', () => {
  const farmacia1: FarmaciaI = {
    razao: 'Gabriel Medicamentos',
    fantasia: 'GabMedics',
    cnpj: '1234567890',
    telefones: [
      '27997218644'
    ]
  }
  const { res, next } = getMockRes()
  const req = getMockReq()

  beforeAll(async () => {
    if (!process.env.MONGO_URL) throw new Error('MongoDB server not initialized')

    await mongoose.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    await Farmacia.deleteMany({})
  })

  it('Deve ser possivel criar uma nova farmacia e retorna-la como resposta', async () => {
    const { res, next } = getMockRes()
    const req = getMockReq({ body: farmacia1 })

    await FarmaciaController.createFarmacia(req, res, next)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(farmacia1))
  })

  it('Não deve ser possivel criar uma farmacia que já existe', async () => {
    const createFarmacia = new CreateFarmaciaService()
    await createFarmacia.execute(farmacia1)

    req.body = farmacia1
    await FarmaciaController.createFarmacia(req, res, next)

    expect(next).toHaveBeenCalledWith(Error('Farmacia já existe'))
  })

  it('Não deve ser possivel criar uma farmacia sem os atributos necessarios', async () => {
    const farmacia2 = {
      razao: 'Gabriel Medicamentos',
      fantasia: 'GabMedics',
      telefones: [
        '27997218644'
      ]
    }

    req.body = farmacia2

    await FarmaciaController.createFarmacia(req, res, next)
    expect(next).toHaveBeenCalledWith(Error('Invalid Request'))
  })
})
