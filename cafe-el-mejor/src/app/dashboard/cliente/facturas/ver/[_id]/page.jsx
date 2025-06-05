import FacturaPage from '@/components/FacturaView';

export default function Page({ params }) {
  return <FacturaPage facturaId={params._id} />;
}
