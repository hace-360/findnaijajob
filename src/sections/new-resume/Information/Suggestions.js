import {Stack, Typography, TextField, MenuItem, Button, Paper, Box} from '@mui/material'
import {IconButtonAnimate} from '../../../components'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';


export default function Suggestion () {

    return (
        <Stack sx= {{p: 1.5}}>
            <Typography variant= 'body3' fontWeight={600}>
                Search for pre-written examples
            </Typography>

            <Stack direction= 'row' alignItems= 'center' spacing= {2} sx= {{py: 1}}>
                <TextField
                    label= 'Search'
                    fullWidth
                    name= 'suggestion'
                    type= 'text'
                    placeholder= 'Ex. Marketer'
                />
                <IconButtonAnimate>
                    <SearchIcon color= 'primary' />
                </IconButtonAnimate>
            </Stack>

            <Typography variant= 'body3' sx= {{paddingBottom: 1}}>
                Showing results for <strong>Full Stack Developer</strong>
            </Typography>

            <Stack spacing= {2} sx= {{py: 2, maxHeight: 350, overflowY: 'auto'}}>
                {
                    lists.map((list, index) => (
                        <Suggest key= {index} data= {list} />
                    ))
                }
            </Stack>

        </Stack>
    )
}

function Suggest ({data}) {

    return (
        <Paper variant= 'outlined' sx= {{width: '100%', height: '100%'}}>
            <MenuItem sx= {{p: 0}}>
                <Stack sx= {{ py: 3 }} spacing= {2} direction= 'row' alignItyems= 'center'>
                    <Box sx= {{px: 1}}>
                        <AddIcon color= 'primary'/>
                    </Box>
                    <Typography variant= 'body2'>
                        {data}
                    </Typography>
                </Stack>
            </MenuItem>
        </Paper>
    )
}


const lists = [
    'sleeping',
    'javascript',
    'python',
    'running'
]