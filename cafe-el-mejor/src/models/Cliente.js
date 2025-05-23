import mongoose from 'mongoose';

const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },
  dni: { type: String, required: true, unique: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', default: null }
}, {
  timestamps: true
});

export default mongoose.models.Cliente || mongoose.model('Cliente', ClienteSchema);
