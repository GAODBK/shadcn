# 创建项目

```shell
pnpm dlx create-next-app@14 --registry=https://registry.npmmirror.com
```

# sidebar

## 目录结构

```text
- src
 - app
  - (dashboard)
   - _components/
   - sidebar.tsx
   - layout.tsx
   - page.tsx
  - layout.tsx
```

## 安装依赖

```shell
# 图标库
pnpm i react-icons
# 组件库
pnpm dlx shadcn@latest init
# Which style would you like to use? › New York
# Which color would you like to use as base color? › Zinc
# Do you want to use CSS variables for colors? › no / yes
# 添加所有组件
pnpm dlx shadcn@latest add --all
```

https://ui.shadcn.com/docs/installation/next

```typescript jsx
// src/app/(dashboard)/_components/sidebar.tsx
import React from 'react';
import Image from "next/image";
import {GoChevronDown} from "react-icons/go";
import {HiOutlineBellAlert} from "react-icons/hi2";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import {BsFillBoxFill, BsJournalBookmark} from "react-icons/bs";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import SidebarSearchInput from "@/app/(dashboard)/_components/sidebar-search-input";
import SidebarRoutes from "@/app/(dashboard)/_components/sidebar-routes";
import SidebarKnowledgeLibraryItem from "@/app/(dashboard)/_components/sidebar-knowledge-library-item";
import SidebarKnowledgeGroupItem from "@/app/(dashboard)/_components/sidebar-knowledge-group-item";

const Sidebar = () => {

    return (
        <div className={`bg-gray-200/20 h-full border-r flex flex-col overflow-y-auto shadow-sm`}>
            {/*header*/}
            <div className={`p-4 items-center flex justify-between`}>
                <div className={`flex items-center gap-x-2`}>
                    {/*logo*/}
                    <Image
                        className={`rounded-md cursor-pointer`}
                        src={`/logo.png`}
                        alt={`logo`}
                        width={32}
                        height={32}
                    />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className={`flex items-center`}>
                                    <span className={`cursor-pointer text-font`}>Malog</span>
                                    <GoChevronDown className={`cursor-pointer size-5`}/>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className={`bg-white text-black`}>
                                <Command className="p-2 rounded-lg border shadow-md md:min-w-72">
                                    <CommandList>
                                        <CommandEmpty>No results found.</CommandEmpty>
                                        <CommandGroup heading="个人">
                                            <CommandItem>
                                                <Link
                                                    href={``}
                                                    className={`gap-x-2 flex items-center`}>
                                                    <Avatar className={`cursor-pointer rounded-full size-8`}>
                                                        <AvatarImage src={'/logo.png'}/>
                                                        <AvatarFallback>
                                                            {'malred'.charAt(0).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className={`flex flex-col justify-center`}>
                                                        <span>malred</span>
                                                        <span className={`text-xs`}>我自己</span>
                                                    </div>
                                                </Link>
                                            </CommandItem>
                                        </CommandGroup>
                                        <CommandSeparator/>
                                        <CommandGroup heading="空间">
                                            <CommandItem>
                                                <Link
                                                    href={``}
                                                    className={`gap-x-2 flex items-center`}>
                                                    <div className={`flex items-center justify-center 
                                                size-7 bg-sky-400 rounded-md`}>
                                                        <BsFillBoxFill className={`text-white cursor-pointer size-5`}/>
                                                    </div>
                                                    <div className={`flex flex-col justify-center`}>
                                                        <span>malred</span>
                                                        <span className={`text-xs`}>1 成员</span>
                                                    </div>
                                                </Link>
                                            </CommandItem>
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className={`flex gap-x-2 items-center`}>
                    <HiOutlineBellAlert className={`cursor-pointer size-5`}/>
                    <Avatar className={`cursor-pointer rounded-full size-7`}>
                        <AvatarImage src={'/logo.png'}/>
                        <AvatarFallback>
                            {'malred'.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div>
                {/*search-input*/}
                <SidebarSearchInput/>
            </div>
            <div className={`flex flex-col w-full py-4`}>
                <SidebarRoutes/>
            </div>
            <SidebarKnowledgeLibraryItem/>
            <div className={'w-full h-6'}/>
            <SidebarKnowledgeGroupItem/>
        </div>
    )
};

export default Sidebar;
```

```typescript jsx
// src/app/(dashboard)/_components/sidebar-search-input.tsx
import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {GoPlus} from "react-icons/go";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {FiClock} from "react-icons/fi";
import {TiPen} from "react-icons/ti";
import {BsJournalBookmark} from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {FcDocument} from "react-icons/fc";
import {LuTableProperties} from "react-icons/lu";
import {LuClipboardPenLine} from "react-icons/lu";
import {GrDocumentText} from "react-icons/gr";
import {BsClipboardData} from "react-icons/bs";
import {LuBookMarked} from "react-icons/lu";
import {FcPuzzle} from "react-icons/fc";
import {FcViewDetails} from "react-icons/fc";
import {FcImport} from "react-icons/fc";
import {RiRobot2Line} from "react-icons/ri";

const SidebarSearchInput = () => {

    return (
        <div className={`flex items-center gap-x-2 mx-4`}>
            <Dialog>
                <DialogTrigger asChild>
                    <Input className={`cursor-pointer h-8 bg-gray-200/40`}/>
                </DialogTrigger>
                <DialogContent className={`p-0`}>
                    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                        <CommandInput placeholder="Type a command or search..."/>
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="页面">
                                <CommandItem>
                                    <FiClock/>
                                    <span>开始</span>
                                </CommandItem>
                                <CommandItem>
                                    <TiPen/>
                                    <span>小记</span>
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator/>
                            <CommandGroup heading="知识库">
                                <CommandItem>
                                    <BsJournalBookmark/>
                                    <span>知识库1</span>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </DialogContent>
            </Dialog>
            <div
                className={`h-8 w-10 cursor-pointer border rounded-md flex items-center justify-center bg-white`}
            >
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <GoPlus className={`size-6`}/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={`py-4 px-2`}>
                        <DropdownMenuItem>
                            <GrDocumentText/>
                            文档
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LuTableProperties/>
                            {/*<FcViewDetails/>*/}
                            表格
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LuClipboardPenLine/>
                            画板
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <BsClipboardData/>
                            数据表
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <LuBookMarked/>
                            知识库
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <FcPuzzle/>
                            从模板新建
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <RiRobot2Line/>
                            Ai帮你写
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FcImport/>
                            导入
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default SidebarSearchInput;
```

```typescript jsx
// src/app/(dashboard)/_components/sidebar-routes.tsx
'use client';
import React from 'react';
import {FiClock} from "react-icons/fi";
import {TiPen} from "react-icons/ti";
import {Clock, Flower, PenLine, Sparkles} from 'lucide-react'
import SidebarItem from "@/app/(dashboard)/_components/sidebar-item";

const routes = [
    {
        icon: FiClock,
        label: "开始",
        href: '/dashboard',
    },
    {
        icon: TiPen,
        label: "小记",
        href: '/dashboard/notes'
    },
    {
        icon: Sparkles,
        label: "收藏",
        href: '/dashboard/collections'
    },
    {
        icon: Flower,
        label: "逛逛",
        href: '/dashboard/explore'
    }
]

const SidebarRoutes = () => {
    return (
        <div className={`flex flex-col w-full`}>
            {routes.map(r => (
                <SidebarItem
                    key={r.href}
                    icon={r.icon}
                    href={r.href}
                    label={r.label}
                />
            ))}
        </div>
    )
        ;
};

export default SidebarRoutes;
```

```typescript jsx
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
```

```typescript jsx
// src/app/(dashboard)/_components/sidebar-knowledge-group-item.tsx
'use client';
import React from 'react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Link from "next/link";
import {Ellipsis, GripVertical} from "lucide-react";
import {BsJournalBookmark} from "react-icons/bs";
import {useRouter} from "next/navigation";

const SidebarKnowledgeGroupItem = () => {
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
                        知识小组
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
                                            知识小组1
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

export default SidebarKnowledgeGroupItem;
```
