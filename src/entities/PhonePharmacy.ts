import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Pharmacy } from './Pharmacy'

export type PhonePharmacyT = {
  numeroTelefone: string
}

@Entity()
export class PhonePharmacy extends BaseEntity {
  @Column({
    nullable: false,
    unique: true
  })
  phoneNumber: string

  @ManyToOne(() => Pharmacy, pharmacy => pharmacy.phones)
  farmacia: Pharmacy
}
