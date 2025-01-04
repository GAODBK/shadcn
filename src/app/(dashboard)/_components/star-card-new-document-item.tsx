// src/app/(dashboard)/_components/star-card-new-document-item.tsx
import React  from 'react';
import {GrDocumentText} from "react-icons/gr";
import {LuClipboardPenLine, LuTableProperties} from "react-icons/lu";
import {BsClipboardData} from "react-icons/bs";
import {Separator} from "@/components/ui/separator";
import {FcImport} from "react-icons/fc";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";
import {HiOutlineDocumentPlus} from "react-icons/hi2";
import {HiOutlineChevronDown} from "react-icons/hi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link";
import {v4 as uuid} from 'uuid'
import {db} from '@/lib/db';

const StarCardNewDocumentItem = async () => {
    const id = uuid()
    const libraries = await db.library.findMany({
        where: {
            // todo
            // userId: ,
        }
    })

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className={`w-[16vw] border rounded-md p-3`}>
                    {/*新建文档*/}
                    <div className={`flex items-center gap-x-2`}>
                        <HiOutlineDocumentPlus className={`m-2 size-5`}/>
                        <div className={`flex flex-col items-start`}>
                            <span className={`text-sm font-semibold cursor-point`}>新建文档</span>
                            <span className={`text-xs text-slate-400/80`}>
                                文档、表格、画板、数据表
                            </span>
                        </div>
                        <HiOutlineChevronDown className={`ml-2 size-4`}/>
                    </div>
                </DropdownMenuTrigger>
                {/*hover后弹出*/}
                <DropdownMenuContent className={`pl-8 bg-white p-1 text-black w-[16vw] border`}>
                    <div
                        className={`mt-2 rounded-md mx-1 py-3 cursor-pointer px-4 hover:bg-slate-300/30 flex items-center gap-x-2`}>
                        <GrDocumentText className={`size-4`}/>
                        <Dialog>
                            <DialogTrigger>
                                <span>新建文档</span>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        新建文档
                                    </DialogTitle>
                                </DialogHeader>
                                <DialogDescription>选择一个知识库</DialogDescription>
                                <Command className={`relative z-50 size-screen inset-y-0`}>
                                    {libraries.length !== 0 && (<CommandInput
                                        placeholder="请输入知识库名称进行搜索"/>)}
                                    <CommandList>
                                        {libraries.length !== 0 && (
                                            <CommandEmpty>未能找到相关知识库，换个关键词试试</CommandEmpty>
                                        )}
                                        <CommandGroup>
                                            {libraries.length !== 0 &&
                                                libraries.map((l) => (
                                                    <Link
                                                        key={l.id}
                                                        href={`/username/${l.id}/${id}/edit`}>
                                                        <CommandItem
                                                            className={`my-2 cursor-pointer`}
                                                        >
                                                            知识库1
                                                        </CommandItem>
                                                    </Link>
                                                ))}
                                        </CommandGroup>
                                        {libraries.length === 0 && (
                                            <Link
                                                className={`underline text-sky-700`}
                                                href={`/dashboard/library`}>
                                                还没有知识库, 创建一个
                                            </Link>
                                        )}
                                    </CommandList>
                                </Command>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div
                        className={`rounded-md mx-1 py-3 cursor-pointer px-4 hover:bg-slate-300/30 flex items-center gap-x-2`}>
                        <LuTableProperties className={`size-4`}/>
                        {/*<FcViewDetails/>*/}
                        <span>新建表格</span>
                    </div>
                    <div
                        className={`rounded-md mx-1 py-3 cursor-pointer px-4 hover:bg-slate-300/30 flex items-center gap-x-2`}>
                        <LuClipboardPenLine className={`size-4`}/>
                        <span>新建画板</span>
                    </div>
                    <div
                        className={`rounded-md mx-1 py-3 cursor-pointer px-4 hover:bg-slate-300/30 flex items-center gap-x-2`}>
                        <BsClipboardData className={`size-4`}/>
                        <span>新建数据表</span>
                    </div>
                    <Separator className={`m-2`}/>
                    <div
                        className={`rounded-md mx-1 py-3 cursor-pointer px-4 hover:bg-slate-300/30 flex items-center gap-x-2`}>
                        <FcImport className={`size-4`}/>
                        <span>导入</span>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default StarCardNewDocumentItem;