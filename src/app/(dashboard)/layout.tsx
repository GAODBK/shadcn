// src/app/(dashboard)/layout.tsx
import React from 'react';
import Sidebar from '@/app/(dashboard)/_components/sidebar';

export default function Layout({
                                   children
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className={`hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50`}>
                <Sidebar/>
            </div>
            <main>
                {children}
            </main>
        </div>
    );
};