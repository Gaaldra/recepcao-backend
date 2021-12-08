import { model, Schema } from 'mongoose'

interface FarmaciaI {
  razao: string
  fantasia: string
  cnpj: string
  telefones?: [string]
}

const schema = new Schema<FarmaciaI>({
  razao: { type: String, required: true },
  fantasia: { type: String, required: true },
  cnpj: { type: String, required: true, unique: true },
  telefones: [String]
})

const Farmacia = model('Farmacia', schema)

export { Farmacia, FarmaciaI }
