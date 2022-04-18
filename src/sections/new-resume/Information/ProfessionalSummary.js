import { Typography, Stack, Grid, Divider } from "@mui/material"
import {ResumeState} from '../../../contexts/ResumeContext'
import { Editor } from '@tinymce/tinymce-react';


export default function ProfessionalSummary () {

    const {summary, setSummary} = ResumeState()
    
    return (
        <div>
            <Stack spacing= {2} sx= {{py: 2,paddingBottom: 4}}>
                <Typography variant= 'h3'>
                    Briefly tell us about your background
                </Typography>
                {/* <Typography variant= 'body1'>
                    Use the samples below, and tailor them to fit your experience and the role.
                </Typography> */}
            </Stack>

            <Stack direction= 'row' divider= {<Divider orientation="vertical" flexItem />}>
                <Grid item xs= {12} md= {12}>
                    <TextArea setForm= {setSummary} form= {summary} />
                </Grid>
            </Stack>

        </div>
    )
}


function TextArea ({setForm, form}) {

  
  return (
      <>
        <Editor
            onEditorChange= {(newValue, editor) => setForm(newValue)}
            value= {form}
            apiKey={process.env.TINY_MCE}
            init={{
            height: 400,
            skin: 'bootstrap',
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
            'removeformat',
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
