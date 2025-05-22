import mongoose from 'mongoose';
import Cliente from '@/lib/models/Cliente'

const CobranzaSchema = new mongoose.Schema({
  identificacion: { type: String, required: true },
  metodoPago: { type: String, required: true },
  producto: { type: String, required: true },
  cliente: { type: Cliente, required: true },
  fecha: { type: Date, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Cobranza || mongoose.model('Cobranza', CobranzaSchema);
