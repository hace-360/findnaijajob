


export default function Uploaded ({upload, hideResume}) {

    return (
        <div
        style= {{
            width: '100%',
            height: '100vh',
            position: 'absolute',
            maxWidth:'1100px',
            overflowY: 'auto'
        }}
        >
            <embed
                src= {upload || ''}
                type="application/pdf"
                frameBorder="0"
                scrolling="auto"
                height="100%"
                width="100%"
            />
        </div>

    )
}