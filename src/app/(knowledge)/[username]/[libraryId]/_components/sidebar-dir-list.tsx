// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-dir-list.tsx
'use client';
import React, {useState} from 'react';
import {CiFolderOn} from "react-icons/ci";
import {IoIosArrowDown} from "react-icons/io";
import {ScrollArea} from "@/components/ui/scroll-area"
import {Note, Group} from '@prisma/client';
import {cn} from "@/lib/utils";
import {createNote} from "@/app/(knowledge)/[username]/[libraryId]/actions/create-note";
import {
    createNote as createNoteWithParent
} from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/create-note";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {Input} from "@/components/ui/input";
import {updateNote} from "@/app/(knowledge)/[username]/[libraryId]/[noteId]/actions/update-note";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const SidebarDirList = ({libraryId, notes, groups}: {
    libraryId: string
    notes: Note[]
    groups: Group[] // todo
}) => {
    const router = useRouter()
    const pathname = usePathname()

    const [open, setOpen] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [name, setName] = useState<string | null>()

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
                            <>
                                {/*@ts-ignore*/}
                                {(!editingId || editingId !== n.id) && n.childrenNote.length === 0 &&
                                    <ContextMenu>
                                        <ContextMenuTrigger>
                                            <div
                                                className={cn(
                                                    `w-full text-sm p-2 hover:bg-gray-300/30 rounded-md`,
                                                    pathname === `/malred/${libraryId}/${n.id}` && `bg-gray-300/30`
                                                )}
                                                key={n.id}>
                                                <Link href={`/malred/${libraryId}/${n.id}`}>
                                                    {n.name}
                                                </Link>
                                            </div>
                                        </ContextMenuTrigger>
                                        <ContextMenuContent>
                                            <ContextMenuItem
                                                onClick={() => setEditingId(n.id)}
                                            >
                                                重命名
                                            </ContextMenuItem>
                                            <ContextMenuItem
                                                onClick={async () => {
                                                    const note = await createNoteWithParent({
                                                        libraryId,
                                                        parentNoteId: n.id
                                                    })
                                                    router.push(`/malred/${libraryId}/${note.id}`)
                                                }}
                                            >
                                                新建文档
                                            </ContextMenuItem>
                                        </ContextMenuContent>
                                    </ContextMenu>}
                                {/*@ts-ignore*/}
                                {(!editingId || editingId !== n.id) && n.childrenNote.length !== 0 &&
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1" className={`p-0 border-none`}>
                                            <AccordionTrigger className={`p-0 border-none`}>
                                                <ContextMenu>
                                                    <ContextMenuTrigger>
                                                        <div
                                                            className={cn(
                                                                `w-full text-sm p-2 hover:bg-gray-300/30 rounded-md`,
                                                                pathname === `/malred/${libraryId}/${n.id}` && `bg-gray-300/30`
                                                            )}
                                                            key={n.id}>
                                                            <Link href={`/malred/${libraryId}/${n.id}`}>
                                                                {n.name}
                                                            </Link>
                                                        </div>
                                                    </ContextMenuTrigger>
                                                    <ContextMenuContent>
                                                        <ContextMenuItem
                                                            onClick={() => setEditingId(n.id)}
                                                        >
                                                            重命名
                                                        </ContextMenuItem>
                                                        <ContextMenuItem
                                                            onClick={async () => {
                                                                const note = await createNoteWithParent({
                                                                    libraryId,
                                                                    parentNoteId: n.id
                                                                })
                                                                router.push(`/malred/${libraryId}/${note.id}`)
                                                                router.refresh()
                                                            }}
                                                        >
                                                            新建文档
                                                        </ContextMenuItem>
                                                    </ContextMenuContent>
                                                </ContextMenu>
                                            </AccordionTrigger>
                                            <AccordionContent className={`space-y-1 py-1 border-none`}>
                                                {/*@ts-ignore*/}
                                                {n.childrenNote.map((item: Note) =>
                                                    <>
                                                        {!editingId && <ContextMenu>
                                                            <ContextMenuTrigger>
                                                                <div
                                                                    className={cn(
                                                                        `w-full text-sm p-2 hover:bg-gray-300/30 rounded-md`,
                                                                        pathname === `/malred/${libraryId}/${item.id}` && `bg-gray-300/30`
                                                                    )}
                                                                    key={item.id}>
                                                                    <Link href={`/malred/${libraryId}/${item.id}`}>
                                                                        {item.name}
                                                                    </Link>
                                                                </div>
                                                            </ContextMenuTrigger>
                                                            <ContextMenuContent>
                                                                <ContextMenuItem
                                                                    onClick={() => setEditingId(item.id)}
                                                                >
                                                                    重命名
                                                                </ContextMenuItem>
                                                                <ContextMenuItem
                                                                    onClick={async () => {
                                                                        const note = await createNoteWithParent({
                                                                            libraryId,
                                                                            parentNoteId: item.id
                                                                        })
                                                                        router.push(`/malred/${libraryId}/${note.id}`)
                                                                        router.refresh()
                                                                    }}
                                                                >
                                                                    新建文档
                                                                </ContextMenuItem>
                                                            </ContextMenuContent>
                                                        </ContextMenu>}
                                                        {editingId && editingId === item.id && (
                                                            <Input
                                                                onKeyDown={async (e) => {
                                                                    if (e.key === 'Enter') {
                                                                        await updateNote({
                                                                            id: editingId,
                                                                            name: name!
                                                                        })
                                                                        setName(null)
                                                                        setEditingId(null)
                                                                        router.refresh()
                                                                    }
                                                                }}
                                                                onBlur={() => setEditingId(null)}
                                                                value={name || item.name}
                                                                onChange={(e) => setName(e.target.value)}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                }
                                {editingId && editingId === n.id && (
                                    <Input
                                        onKeyDown={async (e) => {
                                            if (e.key === 'Enter') {
                                                await updateNote({
                                                    id: editingId,
                                                    name: name!
                                                })
                                                setName(null)
                                                setEditingId(null)
                                                router.refresh()
                                            }
                                        }}
                                        onBlur={() => setEditingId(null)}
                                        value={name || n.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                )}
                            </>
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};

export default SidebarDirList;