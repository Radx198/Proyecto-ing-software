import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, required: true }
});

const CarritoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true, unique: true },
  items: [ItemSchema]
}, {
  timestamps: true
});

export default mongoose.models.Carrito || mongoose.model('Carrito', CarritoSchema);
