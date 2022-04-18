import {Stack, Button} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types'

FooterComponent.propTypes = {
    next: PropTypes.string,
    goNext: PropTypes.func
  };


export default function FooterComponent ({next, goNext}) {

    const router = useRouter()

    return (
        <Stack alignItems= 'center' justifyContent='space-between' sx= {{width: '100%'}} direction= 'row'>
            <Button onClick={() => router.back()} variant= 'outlined' startIcon= {<ArrowBackIosIcon />}>
                Back
            </Button>

            <Button variant= 'contained' onClick= {goNext} >
                Next : {next}
            </Button>
        </Stack>
    )
}