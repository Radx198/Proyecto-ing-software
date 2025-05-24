import mongoose from 'mongoose';

const CobranzaSchema = new mongoose.Schema({
  metodoDePago: {
    type: String,
    enum: ['efectivo', 'tarjeta', 'debito', 'transferencia', 'mercadoPago'],
    required: true
  },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
      cantidad: { type: Number, required: true },
    }
  ],
  fecha: { type: Date, required: true },
  monto: { type: Number, required: true }
}, {
  timestamps: true,
});

export default mongoose.models.Cobranza || mongoose.model('Cobranza', CobranzaSchema);