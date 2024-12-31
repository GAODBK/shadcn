// src/app/(dashboard)/dashboard/library/_components/library-use.tsx
import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";
import {Ellipsis, GripVertical} from "lucide-react";
import {BsJournalBookmark} from "react-icons/bs";
import {GrDocumentText} from "react-icons/gr";
import {LuTableProperties} from "react-icons/lu";

const LibraryUse = () => {
    return (
        <>
            <Accordion className={`bg-gray-300/20 px-4 rounded-md mr-2`} type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className={`no-underline`}>
                        常用
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className={`w-full flex items-center flex-wrap gap-x-2 gap-y-4`}>
                            {[1,2,3,4,5,6,7].map(i=><Link key={i}
                                href={``}
                                className={`w-[32%] h-16 cursor-pointer group items-center flex flex-row justify-between
                                            bg-white hover:bg-slate-300/40 p-2 rounded-md`}>
                                <GripVertical className={`mr-1 size-4 group-hover:inline hidden`}/>
                                <div className={`mr-1 size-4 block group-hover:hidden`}/>
                                <div className={`flex-1 flex flex-row items-center gap-x-2`}>
                                    <BsJournalBookmark className={`size-6`}/>
                                    <div className={`flex flex-col justify-center`}>
                                        <span className={``}>
                                            知识库1
                                        </span>
                                        <span className={`text-sm text-slate-600/60`}>
                                            简介
                                        </span>
                                    </div>
                                </div>
                                <Ellipsis className={`group-hover:block hidden`}/>
                            </Link>)}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    );
};

export default LibraryUse;