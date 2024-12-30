// src/app/(dashboard)/_components/start-hover-cards.tsx
import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {HiOutlineDocumentPlus} from "react-icons/hi2";
import {HiOutlineChevronDown} from "react-icons/hi";
import {DropdownMenuItem, DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {GrDocumentText} from "react-icons/gr";
import {LuBookMarked, LuClipboardPenLine, LuTableProperties} from "react-icons/lu";
import {BsClipboardData} from "react-icons/bs";
import {FcImport, FcPuzzle} from "react-icons/fc";
import {RiRobot2Line} from "react-icons/ri";
import {Separator} from "@/components/ui/separator";
import {LuBookPlus} from "react-icons/lu";
import {Button} from '@/components/ui/button'
import StartCardNewKnowledgeLibrary from "@/app/(dashboard)/_components/start-card-new-knowledge-library";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import StartCardTemplateDialogContent from "@/app/(dashboard)/_components/start-card-template-dialog-content";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"


const StartCards = () => {
    return (
        <div className={`p-4 pt-2 flex items-center gap-x-4`}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className={`w-[16vw] border rounded-md p-3`}>
                        {/*新建文档*/}
                        <div className={`flex items-center gap-x-2`}>
                            <HiOutlineDocumentPlus className={`m-2 size-5`}/>
                            <div className={`flex flex-col items-start`}>
                                <span className={`text-sm font-semibold`}>新建文档</span>
                                <span className={`text-xs text-slate-400/80`}>
                                文档、表格、画板、数据表
                            </span>
                            </div>
                            <HiOutlineChevronDown className={`ml-2 size-4`}/>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent className={`pl-8 bg-white p-1 text-black w-[16vw] border`}>
                        <div
                            className={`mt-2 rounded-md mx-1 py-3 cursor-pointer px-4 hover:bg-slate-300/30 flex items-center gap-x-2`}>
                            <GrDocumentText className={`size-4`}/>
                            <span>新建文档</span>
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
                            <span>新建导入</span>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            {/*新建知识库*/}
            <StartCardNewKnowledgeLibrary/>
            {/*模板中心*/}
            <Dialog>
                <DialogTrigger>
                    <div className={`w-[16vw] border rounded-md p-3`}>
                        <div className={`flex items-center gap-x-2`}>
                            <LuBookPlus className={`m-2 size-5`}/>
                            <div className={`flex flex-col items-start`}>
                                <span className={`text-sm font-semibold`}>模板中心</span>
                                <span className={`text-xs text-slate-400/80`}>
                                    从模板中获取灵感
                                </span>
                            </div>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className={`w-screen`}>
                            <StartCardTemplateDialogContent/>
                </DialogContent>
            </Dialog>

            {/*AI帮你写*/}
            <div className={`w-[16vw] border rounded-md p-3`}>
                <div className={`flex items-center gap-x-2`}>
                    <LuBookPlus className={`m-2 size-5`}/>
                    <div className={`flex flex-col items-start`}>
                        <span className={`text-sm font-semibold`}>AI帮你写</span>
                        <span className={`text-xs text-slate-400/80`}>
                        AI 助手帮你一键生成文档
                    </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartCards;