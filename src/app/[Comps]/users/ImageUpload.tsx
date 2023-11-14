"use client"
import { useDropzone } from "react-dropzone"
import React, { useCallback, useState } from 'react'
import Image from "next/image"
interface ImageUploadProps {
    onChange: (base64: string) => void
    label: string
    value?: string
    disabled?: boolean
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, onChange, disabled, value }) => {
    const [base64, setBase64] = useState<string>(value as string)

    const handleChange = useCallback((base64: string) => {
        onChange(base64)
    }, [onChange])
    const handleDrop = useCallback((files: any) => {
        const file = files[0]
        const reader = new FileReader()
        reader.onload = (e: any) => {
            setBase64(e?.target.result)
            handleChange(e.target.result)
        }
        reader.readAsDataURL(file)
    }, [handleChange])

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    })
    return (
        <div  {...getRootProps({
            className: "w-full p-2 text-center border-2 rounded-md hover:cursor-pointer"
        })}>
            <input {...getInputProps()} className="hover:cursor-pointer" />
            {
                base64 ? (
                    <div className="flex items-center justify-center">
                        <Image src={base64} height={100} width={100} alt="uploaded image" />
                    </div>
                ) : <p className="">{label}</p>
            }
        </div>
    )
}

export default ImageUpload