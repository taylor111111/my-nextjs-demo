'use client';

import { useEffect, useState } from 'react';
import { fetcher } from '@/utils/fetcher';

type SlimUser = {
    name: string;
    role: string;
};

export default function SlimDemoPage() {
    const [user, setUser] = useState<SlimUser | null>(null);

    useEffect(() => {
        fetcher<SlimUser>('/api/slim-user').then(setUser);
    }, []);

    return (
        <main style={{ padding: 24 }}>
            <h2>👤 裁剪后的用户信息</h2>
            {user && (
                <p>
                    {user.name} ({user.role})
                </p>
            )}
        </main>
    );
}
