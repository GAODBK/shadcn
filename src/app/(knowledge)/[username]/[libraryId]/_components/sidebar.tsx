// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar.tsx
import {BsJournalBookmark} from "react-icons/bs";
import React from 'react';
import {db} from "@/lib/db";
import {HiEllipsisHorizontal} from "react-icons/hi2";
import {Separator} from "@/components/ui/separator";
import SidebarSearchInput from "@/app/(knowledge)/[username]/[libraryId]/_components/sidebar-search-input";
import SidebarDirList from "@/app/(knowledge)/[username]/[libraryId]/_components/sidebar-dir-list";
import {Note, Group, Library} from '@prisma/client';
import SidebarHomeItem from "@/app/(knowledge)/[username]/[libraryId]/_components/sidebar-home-item";

const Sidebar = async ({libraryId}: { libraryId: string }) => {
    // @ts-ignore
    const library: Library & {
        Note: Note[]
        Group: Group[]
    } = await db.library.findUnique({
        where: {id: libraryId},
        include: {
            Note: true,
            Group: true
        }
    })

    return (
        <div className={`bg-gray-200/20 h-full border-r flex flex-col overflow-y-auto shadow-sm`}>
            {/*header: icon - library name*/}
            <div className={`flex p-4 justify-between items-center`}>
                <div className={`flex gap-x-2 items-center`}>
                    <BsJournalBookmark className={`text-blue-500 size-5`}/>
                    <text className={`font-bold`}>{library?.name}</text>
                </div>
                <HiEllipsisHorizontal className={`cursor-pointer size-5`}/>
            </div>
            <Separator/>
            <div className={`pt-4`}>
                <SidebarSearchInput/>
            </div>
            <div className={`flex flex-col py-4 items-center gap-y-2`}>
                <SidebarHomeItem libraryId={libraryId}/>
            </div>
            <SidebarDirList
                libraryId={libraryId}
                notes={library?.Note}
                groups={library?.Group}
            />
        </div>
    );
};

export default Sidebar;