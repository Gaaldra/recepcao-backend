import { model, Schema } from 'mongoose'
import { FarmaciaI } from './Farmacia'

interface ChamadoI {
  fechado?: Date
  farmacia: FarmaciaI
  assunto: string
  observacao: [string]
}

const schema = new Schema<ChamadoI>({
  fechado: { type: Date },
  farmacia: { type: Schema.Types.ObjectId, ref: 'Farmacia', required: true },
  assunto: { type: String, required: true },
  observacao: [String]
})

const Chamado = model('Chamado', schema)

export { Chamado, ChamadoI }
