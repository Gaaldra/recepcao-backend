import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Farmacia } from './Farmacia'

export type TelefoneFarmaciaT = {
  numeroTelefone: string
}

@Entity()
export class TelefoneFarmacia extends BaseEntity {
  @Column({
    nullable: false,
    unique: true
  })
  numeroTelefone: string

  @ManyToOne(() => Farmacia, farmacia => farmacia.telefones)
  farmacia: Farmacia[]
}
