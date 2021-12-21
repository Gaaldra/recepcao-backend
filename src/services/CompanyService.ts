import DuplicateError from '@errors/DuplicateError'
import InvalidRequest from '@errors/InvalidRequest'
import { Company, CompanyT } from '../entities/Company'
import { CompanyRepository, PhonesRepository } from 'src/repositories'
import { Like } from 'typeorm'
import UpdateError from '@errors/UpdateError'

class CompanyService implements CompanyT {
  readonly razaoSocial: string;
  readonly nomeFantasia: string
  readonly cnpj: string
  readonly phones: []
  private companyRepository = CompanyRepository()

  constructor ({ razaoSocial, nomeFantasia, cnpj, phones }: CompanyT) {
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

  async create (): Promise<Company> {
    if (await this.companyRepository.findOne({ cnpj: this.cnpj })) throw new DuplicateError('Farmacia already exists')
    const farmacia = this.companyRepository.create({
      razaoSocial: this.razaoSocial,
      nomeFantasia: this.nomeFantasia,
      cnpj: this.cnpj
    })
    const result = await this.companyRepository.save(farmacia)
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

  async update (id: string): Promise<Company> {
    try {
      const result = await this.companyRepository.save({
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

  static async getAllPharmacies (): Promise<Company[]> {
    const repo = CompanyRepository()
    return await repo.find({ relations: ['phones'] })
  }

  static async getSomePharmacies (filter: string): Promise<Company | Company[] | undefined> {
    const repo = CompanyRepository()
    return await repo.find({
      where: [
        { razaoSocial: Like(`%${filter}%`) },
        { nomeFantasia: Like(`%${filter}%`) },
        { cnpj: Like(`%${filter}%`) }
      ],
      relations: ['phones']
    })
  }

  static async getOnePharmacy (id: string): Promise<Company | undefined> {
    const repo = CompanyRepository()
    return await repo.findOne(id, { relations: ['phones'] })
  }
}

export default CompanyService
