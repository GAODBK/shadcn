// src/app/(dashboard)/_components/start-card-new-knowledge-library.tsx
'use client';
import React, {useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {LuBookPlus} from "react-icons/lu";
import {Button} from "@/components/ui/button";
import {BsJournalBookmark} from "react-icons/bs";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useRouter} from "next/navigation";

const StartCardNewKnowledgeLibrary = () => {
    const router = useRouter()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    return (
        <Dialog>
            <DialogTrigger>
                <div className={`w-[16vw] border rounded-md p-3`}>
                    <div className={`flex items-center gap-x-2`}>
                        <LuBookPlus className={`m-2 size-5`}/>
                        <div className={`flex flex-col items-start`}>
                            <span className={`text-sm font-semibold`}>新建知识库</span>
                            <span className={`text-xs text-slate-400/80`}>
                                    使用知识库整理知识
                                </span>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className={`w-96`}>
                <DialogHeader>
                    <DialogTitle>新建知识库</DialogTitle>
                </DialogHeader>
                <div className={`flex flex-col justify-center gap-y-2`}>
                    <div className={`flex gap-x-2`}>
                        <div className={`flex items-center justify-center size-10 p-1 border rounded-md`}>
                            <BsJournalBookmark className={`size-5 text-blue-700`}/>
                        </div>
                        <Input className={`h-10`}
                               placeholder={`知识库名称`}
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <Textarea
                        placeholder={`知识库简介（选填）`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <DialogFooter className="sm:justify-start">
                    <Button
                        // todo: form
                        onClick={() => {
                            router.push(`/username/knowledgeId`)
                        }}
                        disabled={!name}
                        className={`text-white font-bold hover:bg-green-700 bg-green-500 w-full`}
                        type="button" variant="secondary">
                        创建
                    </Button>
                    {/*<DialogClose asChild>*/}
                    {/*    <Button type="button" variant="secondary">*/}
                    {/*        Close*/}
                    {/*    </Button>*/}
                    {/*</DialogClose>*/}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default StartCardNewKnowledgeLibrary;