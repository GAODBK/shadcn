// src/extensions/font-size.ts
import {Extension} from "@tiptap/react";
import '@tiptap/extension-text-style'

// https://github.com/TheNaschkatze/tiptap-extension-font-size/blob/main/
// https://github.com/KID-1912/tiptap-extension-line-height/tree/master/
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (fontSize: string) => ReturnType
            unsetFontSize: () => ReturnType
        }
    }
}

export const FontSizeExtension = Extension.create({
    name: 'fontSize',
    addOptions() {
        return {
            types: ['textStyle']
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: element => element.style.fontSize,
                        renderHTML: attributes => {
                            if (!attributes.fontSize) {
                                return {}
                            }

                            return {
                                style: `font-size: ${attributes.fontSize}`
                            }
                        }
                    }
                }
            }
        ]
    },
    addCommands() {
        return {
            setFontSize: (fontSize: string) => ({chain}) => {
                return chain()
                    .setMark("textStyle", {fontSize})
                    .run()
            },
            unsetFontSize: () => ({chain}) => {
                return chain()
                    .setMark("textStyle", {fontSize: null})
                    .removeEmptyTextStyle()
                    .run()
            },
        }
    }
})