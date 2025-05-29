import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  imagen: { type: String },
  stock: { type: Number, required: true },
  categoria: String
}, {
  timestamps: true
});

export default mongoose.models.Producto || mongoose.model('Producto', ProductoSchema);
