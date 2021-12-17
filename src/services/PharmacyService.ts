import { DuplicateError } from '@errors/DuplicateError'
import { InvalidRequest } from '@errors/InvalidRequest'
import { Pharmacy, PhamacyT } from 'src/entity/Pharmacy'
import { PharmacyRepository, PhonesRepository } from 'src/repositories'
import { Like } from 'typeorm'

class PharmacyService implements PhamacyT {
  readonly razaoSocial: string;
  readonly nomeFantasia: string
  readonly cnpj: string
  readonly phones: []

  constructor ({ razaoSocial, nomeFantasia, cnpj, phones }: PhamacyT) {
    this.razaoSocial = razaoSocial
    this.nomeFantasia = nomeFantasia
    this.cnpj = cnpj
    this.phones = phones
    this.isValid()
  }

  private isValid () {
    if (!this.razaoSocial) throw new InvalidRequest('A razão social é necessária')
    if (!this.nomeFantasia) throw new InvalidRequest('O nome fantasia é necessário')
    if (!this.cnpj) throw new InvalidRequest('O CNPJ é necessário')
    return true
  }

  async create (): Promise<Pharmacy> {
    const repo = PharmacyRepository()
    if (await repo.findOne({ cnpj: this.cnpj })) throw new DuplicateError('Farmacia already exists')
    const farmacia = repo.create({
      razaoSocial: this.razaoSocial,
      nomeFantasia: this.nomeFantasia,
      cnpj: this.cnpj
    })
    const result = await repo.save(farmacia)
    for (const telefone of this.phones) {
      const telefoneRepo = PhonesRepository()
      if (await telefoneRepo.findOne({ phoneNumber: telefone })) continue
      const newTelefone = telefoneRepo.create()
      newTelefone.phoneNumber = telefone
      newTelefone.farmacia = result
      await telefoneRepo.save(newTelefone)
    }
    return result
  }

  async update (id: string): Promise<Pharmacy> {
    const repoFarm = PharmacyRepository()
    const result = await repoFarm.save({
      id,
      razaoSocial: this.razaoSocial,
      nomeFantasia: this.nomeFantasia,
      cnpj: this.cnpj
    })
    for (const telefone of this.phones) {
      const telefoneRepo = PhonesRepository()
      if (await telefoneRepo.findOne({ phoneNumber: telefone })) continue
      const newTelefone = telefoneRepo.create()
      newTelefone.phoneNumber = telefone
      newTelefone.farmacia = result
      await telefoneRepo.save(newTelefone)
    }
    return result
  }

  static async getPharmacy (id?: string, filter = ''): Promise<Pharmacy | Pharmacy[] | undefined> {
    const repo = PharmacyRepository()
    return await repo.find({
      where: [
        { id: filter },
        { razaoSocial: Like(`%${filter}%`) },
        { nomeFantasia: Like(`%${filter}%`) },
        { cnpj: Like(`%${filter}%`) }
      ],
      relations: ['phones']
    })
  }
}

export default PharmacyService
