import { InvalidRequest } from '@errors/InvalidRequest'
import FarmaciaService from '@services/FarmaciaService'
import { NextFunction, Request, Response } from 'express'
import { FarmaciaT } from 'src/entity/Farmacia'

class FarmaciaController {
  async createFarmacia (request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const newFarm: FarmaciaT = request.body
      const farmaciaService = new FarmaciaService(newFarm)
      const result = await farmaciaService.create()
      return response.status(201).json(result)
    } catch (error) {
      return next(error)
    }
  }

  async updateFarmacia (request: Request, response: Response, next: NextFunction): Promise<Response|void> {
    try {
      const { razaoSocial, nomeFantasia, cnpj, telefones }: FarmaciaT = request.body
      const { id } = request.params
      if (!id) return next(new InvalidRequest('Necessario um id'))
      const newInfosFarmacia = new FarmaciaService({ razaoSocial, nomeFantasia, cnpj, telefones })
      newInfosFarmacia.isValid()
      const result = await newInfosFarmacia.update(id)
      return response.json(result)
    } catch (error) {
      return next(error)
    }
  }

  async getAllFarmacias (request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const result = await FarmaciaService.getFarmacia()
      return response.json(result)
    } catch (error) {
      next(error)
    }
  }

  async getOneFarmacia (request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { filter } = request.params
      if (!filter) return next(new InvalidRequest())
      const result = await FarmaciaService.getFarmacia(filter)
      return response.json(result)
    } catch (error) {
      return next(error)
    }
  }
}

export default new FarmaciaController()
