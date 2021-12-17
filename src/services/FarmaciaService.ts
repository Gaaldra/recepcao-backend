import { DuplicateError } from '@errors/DuplicateError'
import { InvalidRequest } from '@errors/InvalidRequest'
import { Farmacia, FarmaciaT } from 'src/entity/Farmacia'
import { FarmaciaRepository, TelefonesRepository } from 'src/repositories'
import { Like } from 'typeorm'

class FarmaciaService implements FarmaciaT {
  readonly razaoSocial: string;
  readonly nomeFantasia: string
  readonly cnpj: string
  readonly telefones: []

  constructor ({ razaoSocial, nomeFantasia, cnpj, telefones }: FarmaciaT) {
    this.razaoSocial = razaoSocial
    this.nomeFantasia = nomeFantasia
    this.cnpj = cnpj
    this.telefones = telefones
  }

  isValid () {
    if (!this.razaoSocial) throw new InvalidRequest('A razão social é necessária')
    if (!this.nomeFantasia) throw new InvalidRequest('O nome fantasia é necessário')
    if (!this.cnpj) throw new InvalidRequest('O CNPJ é necessário')
    return true
  }

  async create (): Promise<Farmacia> {
    const repo = FarmaciaRepository()
    if (await repo.findOne({ cnpj: this.cnpj })) throw new DuplicateError('Farmacia already exists')
    const farmacia = repo.create({
      razaoSocial: this.razaoSocial,
      nomeFantasia: this.nomeFantasia,
      cnpj: this.cnpj
    })
    const result = await repo.save(farmacia)
    for (const telefone of this.telefones) {
      const telefoneRepo = TelefonesRepository()
      if (await telefoneRepo.findOne({ numeroTelefone: telefone })) continue
      const newTelefone = telefoneRepo.create()
      newTelefone.numeroTelefone = telefone
      newTelefone.farmacia = result
      await telefoneRepo.save(newTelefone)
    }
    return result
  }

  async update (id: string): Promise<Farmacia> {
    const repoFarm = FarmaciaRepository()
    const result = await repoFarm.save({
      id,
      razaoSocial: this.razaoSocial,
      nomeFantasia: this.nomeFantasia,
      cnpj: this.cnpj
    })
    for (const telefone of this.telefones) {
      const telefoneRepo = TelefonesRepository()
      if (await telefoneRepo.findOne({ numeroTelefone: telefone })) continue
      const newTelefone = telefoneRepo.create()
      newTelefone.numeroTelefone = telefone
      newTelefone.farmacia = result
      await telefoneRepo.save(newTelefone)
    }
    return result
  }

  static async getFarmacia (filter?: string): Promise<Farmacia|Farmacia[]|undefined> {
    const repo = FarmaciaRepository()
    if (filter) {
      return await repo.find({
        where: [
          { id: filter },
          { razaoSocial: Like(`%${filter}%`) },
          { nomeFantasia: Like(`%${filter}%`) },
          { cnpj: Like(`%${filter}%`) }
        ]
      })
    }
    const result = await repo.find({ relations: ['telefones'] })
    return result
  }
}

export default FarmaciaService
