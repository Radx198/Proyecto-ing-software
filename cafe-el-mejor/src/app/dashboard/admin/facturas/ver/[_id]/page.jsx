import FacturaPage from '@/components/FacturaView';

export default async function Page({ params }) {
  const { _id } = await params
  return <FacturaPage facturaId={_id} />;
}
