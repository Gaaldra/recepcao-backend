import DuplicateError from '@errors/DuplicateError'
import InvalidRequest from '@errors/InvalidRequest'
import { Pharmacy, PharmacyT } from '../entities/Pharmacy'
import { PharmacyRepository, PhonesRepository } from 'src/repositories'
import { Like } from 'typeorm'
import UpdateError from '@errors/UpdateError'

class PharmacyService implements PharmacyT {
  readonly razaoSocial: string;
  readonly nomeFantasia: string
  readonly cnpj: string
  readonly phones: []
  private pharmacyRepository = PharmacyRepository()

  constructor ({ razaoSocial, nomeFantasia, cnpj, phones }: PharmacyT) {
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
  }

  async create (): Promise<Pharmacy> {
    if (await this.pharmacyRepository.findOne({ cnpj: this.cnpj })) throw new DuplicateError('Farmacia already exists')
    const farmacia = this.pharmacyRepository.create({
      razaoSocial: this.razaoSocial,
      nomeFantasia: this.nomeFantasia,
      cnpj: this.cnpj
    })
    const result = await this.pharmacyRepository.save(farmacia)
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
    try {
      const result = await this.pharmacyRepository.save({
        id,
        razaoSocial: this.razaoSocial,
        nomeFantasia: this.nomeFantasia,
        cnpj: this.cnpj
      })
      return result
    } catch (error) {
      throw new UpdateError()
    }
  }

  static async getAllPharmacies (): Promise<Pharmacy[]> {
    const repo = PharmacyRepository()
    return await repo.find({ relations: ['phones'] })
  }

  static async getSomePharmacies (filter: string): Promise<Pharmacy | Pharmacy[] | undefined> {
    const repo = PharmacyRepository()
    return await repo.find({
      where: [
        { razaoSocial: Like(`%${filter}%`) },
        { nomeFantasia: Like(`%${filter}%`) },
        { cnpj: Like(`%${filter}%`) }
      ],
      relations: ['phones']
    })
  }

  static async getOnePharmacy (id: string): Promise<Pharmacy | undefined> {
    const repo = PharmacyRepository()
    return await repo.findOne(id, { relations: ['phones'] })
  }
}

export default PharmacyService
