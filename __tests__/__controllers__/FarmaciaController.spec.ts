import { Farmacia, FarmaciaI } from '@schemas/Farmacia'
import mongoose from 'mongoose'
import { app } from '../../src/server'
import request from 'supertest'
import CreateFarmaciaService from '@services/CreateFarmaciaService'

describe('FarmaciaController', () => {
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

  it('Should be returned a response with a new farmacia created', async () => {
    const farmacia: FarmaciaI = {
      razao: 'Gabriel Medicamentos',
      fantasia: 'GabMedics',
      cnpj: '1234567890',
      telefones: [
        '27997218644'
      ]
    }

    const res = await request(app)
      .post('/farmacia/add')
      .send(farmacia)

    expect(res.statusCode).toBe(201)
    expect(res.body.result).toEqual(expect.objectContaining(farmacia))
  })

  it('Should be returned a response with status code 409 - Farmacia already exists ', async () => {
    const farmacia: FarmaciaI = {
      razao: 'Gabriel Medicamentos',
      fantasia: 'GabMedics',
      cnpj: '1234567890',
      telefones: [
        '27997218644'
      ]
    }

    const createFarmacia = new CreateFarmaciaService()
    await createFarmacia.execute(farmacia)

    const res = await request(app)
      .post('/farmacia/add')
      .send(farmacia)

    expect(res.statusCode).toBe(409)
    expect(res.body).toHaveProperty('message')
  })
})
