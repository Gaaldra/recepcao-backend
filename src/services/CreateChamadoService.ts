import { Chamado, ChamadoI } from '@schemas/Chamado'
import { Document } from 'mongoose'

class CreateChamadoService {
  async execute (chamado: ChamadoI): Promise<Document> {
    const novoChamado = await Chamado.create(chamado)
    return novoChamado
  }
}

export default CreateChamadoService
