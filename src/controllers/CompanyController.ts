import InvalidRequest from '@errors/InvalidRequest'
import CompanyService from '@services/CompanyService'
import { NextFunction, Request, Response } from 'express'
import { CompanyT } from 'src/entities/Company'

class CompanyController {
  async createPharmacy (request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const newFarm: CompanyT = request.body
      const farmaciaService = new CompanyService(newFarm)
      const result = await farmaciaService.create()
      return response.status(201).json(result)
    } catch (error) {
      return next(error)
    }
  }

  async updatePharmacy (request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const company: CompanyT = request.body
      const { id } = request.params
      if (!id) return next(new InvalidRequest('Necessario um id'))
      const updateCompany = new CompanyService(company)
      const result = await updateCompany.update(id)
      return response.json(result)
    } catch (error) {
      return next(error)
    }
  }

  async getAllPharmacies (request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const result = await CompanyService.getAllPharmacies()
      return response.send(JSON.stringify(result))
    } catch (error) {
      next(error)
    }
  }

  async getSomePharmacy (request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { filter } = request.params
      if (!filter) return next(new InvalidRequest())
      const result = await CompanyService.getSomePharmacies(filter)
      return response.send(JSON.stringify(result))
    } catch (error) {
      return next(error)
    }
  }

  async getOnePharmacy (request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params
      if (!id) return next(new InvalidRequest())
      const result = await CompanyService.getOnePharmacy(id)
      return response.json(result)
    } catch (error) {
      return next(error)
    }
  }
}

export default new CompanyController()
