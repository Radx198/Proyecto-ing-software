import mongoose from 'mongoose';

const OrdenDeCompraSchema = new mongoose.Schema({
  productos: [
    {
      nombre: { type: String, required: true },
      cantidad: { type: Number, required: true },
      precioUnitario: { type: Number, required: true }
    }
  ],
  proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true },
  precioTotal: { type: Number, required: true },
  metodoDePago: { 
    type: String, 
    enum: ['efectivo', 'tarjeta', 'transferencia', 'mercadoPago'], 
    required: true 
  },
}, {
  timestamps: true
});

export default mongoose.models.OrdenDeCompra || mongoose.model('OrdenDeCompra', OrdenDeCompraSchema);
