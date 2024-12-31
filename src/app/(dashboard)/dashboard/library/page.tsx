// src/app/(dashboard)/dashboard/library/page.tsx
import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import LibraryUse from "@/app/(dashboard)/dashboard/library/_components/library-use";
import LibraryList from "@/app/(dashboard)/dashboard/library/_components/library-list";

const Page = ({searchParams}: {
    searchParams: {
        view: string
    }
}) => {

    return (
        <div>
            <h2 className={`p-4 font-semibold`}>知识库</h2>
            <div className={`p-4`}>
                <LibraryUse/>
            </div>
            <LibraryList view={searchParams.view}/>
        </div>
    );
};

export default Page;