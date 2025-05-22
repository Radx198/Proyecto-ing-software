import mongoose from 'mongoose';

const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  telefono: String,
  direccion: String,
}, {
  timestamps: true
});

export default mongoose.models.Cliente || mongoose.model('Cliente', ClienteSchema);
