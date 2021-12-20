import { Column, Entity, OneToMany, Unique } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { PhonePharmacy } from './PhonePharmacy'
import Ticket from './Ticket'

export type PharmacyT = {
  razaoSocial: string
  nomeFantasia: string
  cnpj: string
  phones: []
}

@Entity()
@Unique(['cnpj'])
export class Pharmacy extends BaseEntity {
  @Column()
  razaoSocial: string

  @Column()
  nomeFantasia: string

  @Column()
  cnpj: string

  @OneToMany(() => Ticket, ticket => ticket.pharmacy)
  tickets: Ticket[]

  @OneToMany(() => PhonePharmacy, phone => phone.farmacia)
  phones: PhonePharmacy[]
}
