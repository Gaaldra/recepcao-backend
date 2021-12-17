import { Column, Entity, OneToMany, Unique } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { TelefoneFarmacia } from './TelefoneFarmacia'

export type FarmaciaT = {
  razaoSocial: string
  nomeFantasia: string
  cnpj: string
  telefones: []
}

@Entity()
@Unique(['cnpj'])
export class Farmacia extends BaseEntity {
  @Column()
  razaoSocial: string

  @Column()
  nomeFantasia: string

  @Column()
  cnpj: string

  @OneToMany(() => TelefoneFarmacia, telefone => telefone.farmacia)
  telefones: TelefoneFarmacia[]
}
