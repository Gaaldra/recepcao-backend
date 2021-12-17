import { Column, Entity, OneToMany, Unique } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { PhonePharmacy } from './PhonePharmacy'

export type PhamacyT = {
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

  @OneToMany(() => PhonePharmacy, phone => phone.farmacia)
  phones: PhonePharmacy[]
}
