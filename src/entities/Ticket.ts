import { Column, Entity, ManyToOne, UpdateDateColumn } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Company } from './Company'

export type TicketT = {
  topic: string
  observation: string
  tecnico: string
  company: Company
}

@Entity()
export class Ticket extends BaseEntity {
  @Column()
  topic: string

  @Column()
  observation: string

  @Column()
  tecnico: string

  @ManyToOne(() => Company, company => company.tickets)
  company: Company

  @UpdateDateColumn()
  updatedAt: Date

  @Column({
    nullable: true
  })
  closedAt: Date
}
