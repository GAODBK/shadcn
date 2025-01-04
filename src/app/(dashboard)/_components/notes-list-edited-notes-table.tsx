// src/app/(dashboard)/_components/IEditedNotesTable.tsx
'use client';
import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {GoPencil} from "react-icons/go";
import {FcFile} from "react-icons/fc";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {HiEllipsisHorizontal} from "react-icons/hi2";
import {FcRating} from "react-icons/fc";
import {PiBroom} from "react-icons/pi";
import {CiShare1} from "react-icons/ci";
import Link from "next/link";
import {Note} from "@prisma/client";
import {formatDistanceToNow} from "date-fns";
import {zhCN} from "date-fns/locale/zh-CN";
import {useRouter} from "next/navigation";
import {deleteNote} from "@/app/(knowledge)/[username]/[libraryId]/actions/delete-note";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {cn} from "@/lib/utils";

const NotesListEditedNotesTable = ({notes}: { notes: Note[] }) => {
    const router = useRouter()

    return (
        <Table className={`w-full`}>
            <TableCaption>查看更多</TableCaption>
            <TableBody className={``}>
                {notes && notes.map((item: Note) => (
                    <TableRow className={`group`}>
                        {/*标题*/}
                        <TableCell className={`w-[34vw] p-6`}>
                            <div className={`h-6 gap-x-2 flex items-center`}>
                                <FcFile className={`size-6`}/>
                                <span>{item.name}</span>
                                <Link href={`/username/knowledgeId/noteId`}
                                      className={`group-hover:block hidden`}>
                                    <GoPencil className={`size-4`}/>
                                </Link>
                            </div>
                        </TableCell>
                        {/*对应知识库*/}
                        <TableCell className="w-[25vw] text-gray-600/50">
                            {/*@ts-ignore*/}
                            {item.library.name}
                        </TableCell>
                        {/*上次编辑时间*/}
                        <TableCell>
                            {formatDistanceToNow(item.updatedAt, {
                                locale: zhCN
                            })}前
                        </TableCell>
                        {/*other*/}
                        <TableCell className="">
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className={`hover:bg-slate-200 rounded-md group-hover:block hidden`}
                                >
                                    <HiEllipsisHorizontal
                                        className={`size-8 p-2`}/>
                                </DropdownMenuTrigger>
                                <DropdownMenuTrigger
                                    className={`hover:bg-slate-200 rounded-md group-hover:hidden block`}
                                >
                                    <div
                                        className={`size-8 p-2`}/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <FcRating/>
                                        收藏
                                    </DropdownMenuItem>
                                    {/*不是item就不会点击后马上被关闭*/}
                                    <AlertDialog>
                                        <AlertDialogTrigger className={`cursor-pointer`} asChild>
                                            <div
                                                className={cn(
                                                    'cursor-pointer',
                                                    "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
                                                )}
                                            >
                                                <PiBroom/>
                                                移除
                                            </div>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>确定删除笔记吗?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    这个操作无法撤回!
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>取消</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={async () => {
                                                        await deleteNote(item.id)
                                                        router.refresh()
                                                    }}
                                                >确定</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem
                                        onClick={async () => {
                                            router.push(`/malred/${item.libraryId}/${item.id}`)
                                        }}>
                                        <CiShare1/>
                                        浏览器打开
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default NotesListEditedNotesTable;