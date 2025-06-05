'use client';

import { useEffect, useState } from 'react';
import { fetcher } from '@/utils/fetcher';

type DashboardData = {
    user: {
        name: string;
        role: string;
    };
    products: {
        id: string;
        name: string;
    }[];
};

export default function DashboardDemoPage() {
    const [data, setData] = useState<DashboardData | null>(null);

    useEffect(() => {
        fetcher<DashboardData>('/api/dashboard').then(setData);
    }, []);

    return (
        <main style={{ padding: 24 }}>
            <h2>📊 Dashboard 聚合数据</h2>

            {data && (
                <>
                    <section>
                        <strong>User:</strong> {data.user.name} ({data.user.role})
                    </section>

                    <section style={{ marginTop: 12 }}>
                        <strong>Products:</strong>
                        <ul>
                            {data.products.map((p) => (
                                <li key={p.id}>{p.name}</li>
                            ))}
                        </ul>
                    </section>
                </>
            )}
        </main>
    );
}
