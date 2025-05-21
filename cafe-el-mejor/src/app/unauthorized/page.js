export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Acceso denegado</h1>
        <p className="mt-2 text-gray-700">No tenés permiso para ver esta página.</p>
      </div>
    </div>
  );
}
