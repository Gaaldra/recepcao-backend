import { InvalidRequest } from '@errors/InvalidRequest'
import PharmacyService from '@services/PharmacyService'
import { NextFunction, Request, Response } from 'express'
import { PharmacyT } from 'src/entities/Pharmacy'

class PharmacyController {
  async createPharmacy(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const newFarm: PharmacyT = request.body
      const farmaciaService = new PharmacyService(newFarm)
      const result = await farmaciaService.create()
      return response.status(201).json(result)
    } catch (error) {
      return next(error)
    }
  }

  async updatePharmacy(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { razaoSocial, nomeFantasia, cnpj, phones: telefones }: PharmacyT = request.body
      const { id } = request.params
      if (!id) return next(new InvalidRequest('Necessario um id'))
      const newInfosFarmacia = new PharmacyService({ razaoSocial, nomeFantasia, cnpj, phones: telefones })
      const result = await newInfosFarmacia.update(id)
      return response.json(result)
    } catch (error) {
      return next(error)
    }
  }

  async getAllPharmacies(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const result = await PharmacyService.getAllPharmacies()
      return response.json(result)
    } catch (error) {
      next(error)
    }
  }

  async getSomePharmacy(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { filter } = request.params
      if (!filter) return next(new InvalidRequest())
      const result = await PharmacyService.getSomePharmacies(filter)
      return response.send(JSON.stringify(result))
    } catch (error) {
      return next(error)
    }
  }

  async getOnePharmacy(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params
      if (!id) return next(new InvalidRequest())
      const result = await PharmacyService.getOnePharmacy(id)
      return response.json(result)
    } catch (error) {
      return next(error)
    }
  }
}

export default new PharmacyController()
