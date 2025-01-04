// src/app/(dashboard)/_components/sidebar-knowledge-library-item.tsx
// 'use client';
import React from 'react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Link from "next/link";
import {ChevronDownIcon, Ellipsis, GripVertical} from "lucide-react";
import {BsJournalBookmark} from "react-icons/bs";
import {db} from '@/lib/db';

const SidebarKnowledgeLibraryItem = async () => {
    const libraries = await db.library.findMany({})

    return (
        <div className={`px-2`}>
            <Accordion
                type="single" collapsible>
                <AccordionItem
                    value="item-1">
                    <AccordionTrigger
                        // title={'双击进入知识库首页'}
                        className={`py-3 hover:no-underline rounded-md bg-gray-200/40 px-4`}
                    >
                        <Link href={`/dashboard/library`}>
                            <span className={`p-1 hover:bg-gray-300/40`}>知识库</span>
                        </Link>
                    </AccordionTrigger>
                    <AccordionContent className={`py-2 px-2`}>
                        <div className={`flex flex-col`}>
                            {libraries && libraries.map((item) => (
                                <Link key={item.id}
                                      href={`/malred/${item.id}`}
                                      className={`cursor-pointer group items-center flex flex-row justify-between
                                                 hover:bg-slate-300/40 p-2 rounded-md`}>
                                    <GripVertical className={`mr-1 size-4 group-hover:inline hidden`}/>
                                    <div className={`mr-1 size-4 block group-hover:hidden`}/>
                                    <div className={`flex-1 flex flex-row items-center gap-x-1`}>
                                        <BsJournalBookmark className={`size-5`}/>
                                        <span className={``}>
                                            {item.name}
                                        </span>
                                    </div>
                                    <Ellipsis className={`group-hover:block hidden`}/>
                                </Link>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default SidebarKnowledgeLibraryItem;