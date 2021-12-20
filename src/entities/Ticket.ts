import { Column, Entity, ManyToOne, UpdateDateColumn } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Pharmacy } from './Pharmacy'

export type TicketT = {
  topic: string
  observation: string
  tecnico: string
  pharmacy: Pharmacy
}

@Entity()
export default class Ticket extends BaseEntity {
  @Column()
  topic: string

  @Column()
  observation: string

  @Column()
  tecnico: string

  @ManyToOne(() => Pharmacy, pharmacy => pharmacy.tickets)
  pharmacy: Pharmacy

  @UpdateDateColumn()
  updatedAt: Date
}
