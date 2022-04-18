import React, { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';


export default function JobDescription({setForm, form}) {
  
  return (
      <>
        <Editor
            onChange= {(e, editor) => setForm({...form, content: editor.getContent()})}
            initialValue=''
            apiKey={process.env.TINY_MCE}
            init={{
            height: 500,
            branding: false,
            content_css: [
                "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap",
                ],
            menubar: true,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat',
            content_style: 'body { font-family:Poppins,Roboto, Arial,sans-serif; font-size:14px; }'
            }}
        />
    </>
  )
}
