import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  contraseña: { type: String, required: true },
  mail: { type: String, required: true },
  telefono: { type: String, required: true },
  direccion: { type: String, required: true },
  dni: {type: Number },
  role: {
    type: String,
    enum: ['admin', 'cliente', 'cajero', 'personalDeCompra', 'invitado'],
    required: true
  },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
      cantidad: { type: Number, required: true },
    }
  ],
}, {
  timestamps: true
});

export default mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);
