import mongoose from 'mongoose';

const OrdenDeCompraSchema = new mongoose.Schema({
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
      cantidad: { type: Number, required: true },
    }
  ],
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
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
