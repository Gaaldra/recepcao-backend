import { InvalidRequest } from '@errors/InvalidRequest'
import { FarmaciaI } from '@schemas/Farmacia'
import CreateFarmaciaService from '@services/CreateFarmaciaService'
import { NextFunction, Request, Response } from 'express'

class FarmaciaController {
  private isInvalid (obj: any): obj is FarmaciaI {
    return !('razao' in obj && 'fantasia' in obj && 'cnpj' in obj)
  }

  async createFarmacia (request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const farmacia: FarmaciaI = request.body
      if (this.isInvalid(farmacia)) return next(new InvalidRequest())
      const createFarmacia = new CreateFarmaciaService()
      const result = await createFarmacia.execute(farmacia)
      return response.status(201).json(result)
    } catch (error) {
      return next(error)
    }
  }
}

export default new FarmaciaController()
