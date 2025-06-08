'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { CarritoProvider } from '@/context/CarritoContext';

export default function TiendaLayout({ children }) {
    return <CarritoProvider>
        <Header />
        {children}
        <Footer />
    </CarritoProvider>;
}
