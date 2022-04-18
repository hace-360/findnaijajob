import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types'
// import tinymce from ''

TextArea.prototype = {
    setForm: PropTypes.func,
    form: PropTypes.object,
    label: PropTypes.string
}


export default function TextArea ({setForm, form, label, skin= 'borderless', height, text= false}) {

  
  return (
      <>
        <Editor
            onEditorChange= {(newValue, editor) => {
                text ? 
                setForm({...form, [label || 'content']: editor.getContent({format: 'text'})}) :
                setForm({...form, [label || 'content']: newValue})}
            } 
            value= {form[label] || form?.content}
            apiKey={process.env.TINY_MCE}
            init={{
            height: height || 500,
            skin: skin,
            // selector: 'textarea',
            branding: false,
            content_css: [
                "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap",
                ],
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help'
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            elementpath: false,
            content_style: `
                body {
                    font-family: poppins, roboto;
                    border-radius: 10px;
                    font-size: 13px;
                }
            `
            }}
        />
    </>
  )
}
