import mongoose from 'mongoose';

const ProveedorSchema = new mongoose.Schema({
  nombreLegal: { type: String, required: true },
  direccionEmpresa: String,
  fechaInicioContrato: Date,
  fechaFinContrato: Date,
  fechaUltimaEntrega: Date,
  contacto: String,
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: false },
    }
  ],
}, {
  timestamps: true
});

export default mongoose.models.Proveedor || mongoose.model('Proveedor', ProveedorSchema);
