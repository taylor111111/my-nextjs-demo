// app/demo-csr/page.tsx
'use client';

import useSWR from 'swr';
import DemoCsrContent from '@/components/DemoCsrContent';
import { fetcher } from '@/lib/fetcher';

export default function DemoCsrPage() {
    const { data, error, isLoading } = useSWR('/api/data', fetcher);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong.</p>;

    return <DemoCsrContent data={data} />;
}
