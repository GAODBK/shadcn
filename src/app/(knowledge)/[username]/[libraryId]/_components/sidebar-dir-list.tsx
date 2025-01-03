// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-dir-list.tsx
'use client';
import React, {useState} from 'react';
import {CiFolderOn} from "react-icons/ci";
import {IoIosArrowDown} from "react-icons/io";
import {ScrollArea} from "@/components/ui/scroll-area"
import {Note, Group} from '@prisma/client';
import {cn} from "@/lib/utils";
import {createNote} from "@/app/(knowledge)/[username]/[libraryId]/actions/create-note";
import {useRouter} from "next/navigation";
import Link from "next/link";

const SidebarDirList = ({libraryId, notes, groups}: {
    libraryId: string
    notes: Note[]
    groups: Group[]
}) => {
    const router = useRouter()

    const [open, setOpen] = useState(false)

    const onClick = async () => {
        const note = await createNote({libraryId})
        router.push(`/malred/${libraryId}/${note.id}`)
    }

    return (
        <div className={`px-5 w-full`}>
            <div className={`flex justify-between`}>
                <div className={`flex gap-x-2`}>
                    <CiFolderOn className={`size-5`}/>
                    <span className={`text-sm`}>目录</span>
                </div>
                <IoIosArrowDown
                    onClick={() => setOpen(!open)}
                    className={cn(
                        `transition-all duration-200 size-5`,
                        !open && `rotate-90`
                    )}/>
            </div>
            <ScrollArea className="my-2 h-[72vh] w-full">
                {open && notes.length === 0 && groups.length === 0 && (
                    <div className={`transition-all duration-200 w-full h-[71vh] flex justify-center items-center`}>
                        <div>知识库为空，你可以<span
                            className={`text-blue-500 underline`}
                            onClick={onClick}
                        >新建文档</span>
                        </div>
                    </div>
                )}
                {open && (notes.length === 0 || groups.length === 0) && (
                    <div className={`w-full p-1`}>
                        {notes.map(n => (
                            <div
                                className={`w-full text-sm p-2 hover:bg-gray-300/30 rounded-md`}
                                key={n.id}>
                                <Link href={`/malred/${libraryId}/${n.id}`}>
                                    {n.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};

export default SidebarDirList;