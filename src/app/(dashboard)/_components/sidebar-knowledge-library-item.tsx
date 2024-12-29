// src/app/(dashboard)/_components/sidebar-knowledge-library-item.tsx
'use client';
import React from 'react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Link from "next/link";
import {Ellipsis, GripVertical} from "lucide-react";
import {BsJournalBookmark} from "react-icons/bs";
import {useRouter} from "next/navigation";

const SidebarKnowledgeLibraryItem = () => {
    const router = useRouter()

    return (
        <div className={`px-2`}>
            <Accordion
                type="single" collapsible>
                <AccordionItem
                    onDoubleClick={() => router.push(`/`)}
                    value="item-1">
                    <AccordionTrigger
                        className={`py-3 hover:no-underline rounded-md bg-gray-200/40 px-4`}
                    >
                        知识库
                    </AccordionTrigger>
                    <AccordionContent className={`py-2 px-2`}>
                        <div className={`flex flex-col`}>
                            <Link
                                href={``}
                                className={`cursor-pointer group items-center flex flex-row justify-between
                                                 hover:bg-slate-300/40 p-2 rounded-md`}>
                                <GripVertical className={`mr-1 size-4 group-hover:inline hidden`}/>
                                <div className={`mr-1 size-4 block group-hover:hidden`}/>
                                <div className={`flex-1 flex flex-row items-center gap-x-1`}>
                                    <BsJournalBookmark className={`size-5`}/>
                                    <span className={``}>
                                            知识库1
                                        </span>
                                </div>
                                <Ellipsis className={`group-hover:block hidden`}/>
                            </Link>
                            <Link
                                href={``}
                                className={`cursor-pointer group items-center flex flex-row justify-between
                                                 hover:bg-slate-300/40 p-2 rounded-md`}>
                                <GripVertical className={`mr-1 size-4 group-hover:inline hidden`}/>
                                <div className={`mr-1 size-4 block group-hover:hidden`}/>
                                <div className={`flex-1 flex flex-row items-center gap-x-1`}>
                                    <BsJournalBookmark className={`size-5`}/>
                                    <span className={``}>
                                            知识库2
                                        </span>
                                </div>
                                <Ellipsis className={`group-hover:block hidden`}/>
                            </Link>
                            <Link
                                href={``}
                                className={`cursor-pointer group items-center flex flex-row justify-between
                                                 hover:bg-slate-300/40 p-2 rounded-md`}>
                                <GripVertical className={`mr-1 size-4 group-hover:inline hidden`}/>
                                <div className={`mr-1 size-4 block group-hover:hidden`}/>
                                <div className={`flex-1 flex flex-row items-center gap-x-1`}>
                                    <BsJournalBookmark className={`size-5`}/>
                                    <span className={``}>
                                            知识库3
                                        </span>
                                </div>
                                <Ellipsis className={`group-hover:block hidden`}/>
                            </Link>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default SidebarKnowledgeLibraryItem;