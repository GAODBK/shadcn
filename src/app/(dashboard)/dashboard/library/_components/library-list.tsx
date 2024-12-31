// src/app/(dashboard)/dashboard/library/_components/library-list.tsx
import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Ellipsis, GripVertical} from "lucide-react";
import {BsJournalBookmark} from "react-icons/bs";
import Link from "next/link";
import {MdFormatListBulleted} from "react-icons/md";
import {AiOutlineAppstore} from "react-icons/ai";
import {Separator} from "@/components/ui/separator";
import {FiPlus} from "react-icons/fi";
import {IoChevronDownOutline} from "react-icons/io5";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {LuBookPlus} from "react-icons/lu";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import LibraryNewForm from "@/app/(dashboard)/dashboard/library/_components/library-new-form";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import LibraryListNewIcons from "@/app/(dashboard)/dashboard/library/_components/library-list-new-icons";
import LibraryListToggleView from "@/app/(dashboard)/dashboard/library/_components/library-list-toggle-view";

// todo: 根据view渲染列表或分组card
const LibraryList = ({view}: { view: string }) => {

    return (
        <div className={`px-4 py-3`}>
            <Tabs defaultValue="my" className="w-full">
                <div className={`flex justify-between pr-2`}>
                    <TabsList>
                        <TabsTrigger value="my">我个人的</TabsTrigger>
                        <TabsTrigger value="group">来自知识小组的</TabsTrigger>
                        <TabsTrigger value="invite">邀请协作的</TabsTrigger>
                    </TabsList>
                    <div className={`flex-1`}/>
                    <LibraryListNewIcons/>
                    <TabsList>
                        <LibraryListToggleView/>
                    </TabsList>
                </div>
                <TabsContent value="my" className={`my-6 w-full flex-wrap flex flex-row items-center gap-4`}>
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i}
                             className={`rounded-md h-44 border flex flex-col`}>
                            <Link
                                href={``}
                                className={`h-20 w-96 cursor-pointer group items-center 
                                            flex flex-row justify-between
                                            bg-white p-2 rounded-md`}>
                                <div className={`px-2 flex-1 flex flex-row items-center gap-x-2`}>
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
                                <div className={`rounded-md p-1 hover:border`}>
                                    <Ellipsis
                                        className={`size-6 group-hover:block hidden`}/>
                                </div>
                            </Link>
                            <ul className={`mb-4 pl-5 pr-4 space-y-2`}>
                                {[1, 2, 3].map(i => (
                                    <li key={i} className={`cursor-pointer list-disc mx-4`}>
                                        <div className={`flex justify-between 
                                        hover:text-slate-600
                                        text-sm text-slate-600/60`}>
                                            {/*<span className={`mr-2 font-bold`}>·</span>*/}
                                            <span className={``}>1111</span>
                                            <span>2024-01-01</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </TabsContent>
                <TabsContent value="group">来自知识小组的</TabsContent>
                <TabsContent value="invite">邀请协作的</TabsContent>
            </Tabs>
        </div>
    );
};

export default LibraryList;