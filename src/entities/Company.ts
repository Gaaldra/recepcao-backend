import { Column, Entity, OneToMany, Unique } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { PhoneCompany } from './PhoneCompany'
import { Ticket } from './Ticket'

export type CompanyT = {
  razaoSocial: string
  nomeFantasia: string
  cnpj: string
  phones: []
}

@Entity()
@Unique(['cnpj'])
export class Company extends BaseEntity {
  @Column()
  razaoSocial: string

  @Column()
  nomeFantasia: string

  @Column()
  cnpj: string

  @OneToMany(() => Ticket, ticket => ticket.company)
  tickets: Ticket[]

  @OneToMany(() => PhoneCompany, phone => phone.companies)
  phones: PhoneCompany[]
}
