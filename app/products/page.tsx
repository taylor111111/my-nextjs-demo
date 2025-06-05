'use client';

import { useEffect, useState } from 'react';
import { fetcher } from '@/utils/fetcher';

type User = {
    id: string;
    name: string;
    role: string;
};

type Product = {
    id: string;
    name: string;
    price: number;
};

export default function DemoPage() {
    const [user, setUser] = useState<User | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetcher<User>('/api/user').then(setUser);
        fetcher<Product[]>('/api/product').then(setProducts);
    }, []);

    return (
        <main style={{ padding: 24 }}>
            <h2>User Info</h2>
            {user && (
                <p>
                    {user.name} ({user.role})
                </p>
            )}

            <h2>Product List</h2>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        {p.name} - ${p.price}
                    </li>
                ))}
            </ul>
        </main>
    );
}
