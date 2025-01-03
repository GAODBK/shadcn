import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {useCallback} from "react";


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// 黏贴图片
// @ts-ignore
export async function pasteImage(_event, editor, slug) {

    const clipboardItems = await navigator.clipboard.read()
    // const fileList: File[] = []
    // const urlList: string[] = []
    for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
            // 筛选图片类型的文件
            if (type.indexOf('image') > -1) {
                const blob = await clipboardItem.getType(type)
                // 将Blob转换成File
                const file = new File([blob], `image-${Date.now()}`, {type: type})
                // fileList.push(file)
                // 将Blob转换成url，方便前端展示预览图
                // const url = URL.createObjectURL(blob)
                // urlList.push(file)

                const formData = new FormData();
                formData.append('file', file);
                if (slug) formData.append('slug', slug);

                try {
                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    const data = await response.json();
                    if (response.ok) {
                        // @ts-ignore
                        editor.chain().focus().setImage({
                            // src: 'http://localhost:3000' + data.url,
                            src: data.url,
                        }).run();
                    } else {
                        console.error('Upload failed:', data.error);
                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        }
    }
}

// eslint-disable-next-line react-hooks/rules-of-hooks
// @ts-ignore
export const addFileLinkWrapper = (editor) => useCallback(() => {
    // const url = window.prompt('URL');
    // if (!url) return;
    // editor.chain().focus().setImage({src: url}).run();


    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    // fileInput.accept = 'image/*';
    fileInput.onchange = async (event) => {
        // @ts-ignore
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('/api/uploadFile', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (response.ok) {
                    editor.chain().focus().extendMarkRange('link').setLink({
                        href: data.url,
                        class: 'tiptap-link'
                    }).run();
                } else {
                    console.error('Upload failed:', data.error);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    fileInput.click();
}, [editor]);

// eslint-disable-next-line react-hooks/rules-of-hooks
// @ts-ignore
export const addImageWrapper = (editor, slug) => useCallback(() => {
    console.log(slug)
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (event) => {
        // @ts-ignore
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            if (slug) formData.append('slug', slug);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (response.ok) {
                    editor.chain().focus().setImage({
                        src: data.url,
                        class: 'tiptap-img'
                    }).run();
                } else {
                    console.error('Upload failed:', data.error);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    fileInput.click();
}, [editor]);

// eslint-disable-next-line react-hooks/rules-of-hooks
// @ts-ignore
export const setLinkWrapper = (editor) => useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
        return
    }

    // empty
    if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink()
            .run()

        return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({
        href: url,
        // class: 'tiptap-link'
    })
        .run()
}, [editor])


// @ts-ignore
export const uploadVideo = async (formData, onChange) => {
    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    if (response.ok) {
        onChange(data.url)
    } else {
        console.error('Upload failed:', data.error);
    }
}

// @ts-ignore
export const uploadImage = async (formData, onChange) => {
    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    if (response.ok) {
        // 是否加上前缀?
        onChange(data.url)
    } else {
        console.error('Upload failed:', data.error);
    }
}