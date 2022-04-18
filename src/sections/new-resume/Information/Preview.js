import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {Stack, Typography, Link, Paper, Dialog, DialogContent, MenuItem, DialogTitle, Slide} from '@mui/material'
import {useState, forwardRef} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types'
import GetTemplate from '../Templates'
import data from '../Templates/userData'
import {SwipeTemplate} from '../Templates/PreviewModal'
import {ResumeState} from '../../../contexts/ResumeContext'

Preview.prototype = {
    hide: PropTypes.bool
}


export default function Preview ({hide}) {

    const [open, setOpen] = useState(false);
    const closePrev = () => setOpen(false)
    const openPrev = () => setOpen(true)

    return (
        <Stack spacing= {1} sx= {{pt: 4, pl: 4}}>
        <Stack 
            direction= 'row' 
            spacing= {1} 
            alignItems= 'center' 
            justifyContent= 'flex-end' 
            sx= {{cursor: 'pointer', width: '100%'}}
            onClick= {openPrev}
        >
            <RemoveRedEyeIcon />
            <Link color= 'inherit'>
                <Typography variant= 'button' color= 'info'>
                    preview
                </Typography>
            </Link>
        </Stack>
        {!hide && <PrevComponent onClick= {openPrev} />}

        { open && <SwipeTemplate open= {open} onClose= {closePrev} /> }
        </Stack>
    )
}

function PrevComponent ({onClick}) {

  const {activeTemplate} = ResumeState()


    return (
        <Paper
          onClick= {onClick}
          variant= 'outlined'
          sx= {{
            maxHeight: 350,
            height: 350,
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            border: '2px solid orange',
            justifyContent: 'flex-start',
            "&:hover": {
              border: '2px solid green'
            }
          }}
          >
            <MenuItem sx= {{p: 0}}>
              {
                GetTemplate({name: activeTemplate, sx: {
                  transform: 'scale(0.5, 0.5)',
                  transformOrigin: 'top left'
                }})
              }
            </MenuItem>
        </Paper>
    )
}



// const Transition = forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
//   });

// export function PreviewModal ({open, closePrev}) {

//   return (
//     <>
//       <Dialog
//         fullWidth={true}
//         maxWidth='md'
//         open={open}
//         TransitionComponent={Transition}
//         keepMounted
//         onClose={closePrev}
//       >
//         <DialogTitle>
//             <Stack direction= 'row' alignItems= 'center' justifyContent='flex-end'>
//                 <CloseIcon sx= {{fontWeight: 900, cursor: 'pointer'}} onClick= {closePrev} />
//             </Stack>
//         </DialogTitle>

//         <DialogContent>
//           { GetTemplate({name: }) }
//         </DialogContent>

//       </Dialog>
//     </>
//   );
// }
