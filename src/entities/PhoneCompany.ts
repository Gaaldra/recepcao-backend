import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Company } from './Company'

export type PhoneCompanyT = {
  numeroTelefone: string
}

@Entity()
export class PhoneCompany extends BaseEntity {
  @Column({
    nullable: false,
    unique: true
  })
  phoneNumber: string

  @ManyToOne(() => Company, company => company.phones)
  companies: Company
}
