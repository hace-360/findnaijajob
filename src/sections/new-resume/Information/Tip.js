import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import {Stack, Typography, Link} from '@mui/material'

export default function Tip () {

    return (
        <Link>
            <Stack direction= 'row' alignItems= 'center' spacing= {0.5}>
                    <OnlinePredictionIcon  />

                    <Typography variant= 'button'>
                        Tip
                    </Typography>
            </Stack>
        </Link>
    )
}