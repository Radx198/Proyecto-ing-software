import mongoose from 'mongoose';

const FacturaSchema = new mongoose.Schema({
  identificacion: { type: String, required: true },
  metodoPago: { type: String, required: true },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  fecha: { type: Date, required: true },
  monto: { type: Number, required: true }
}, {
  timestamps: true,
});

export default mongoose.models.Factura || mongoose.model('Factura', FacturaSchema);