import {Stack, Box} from '@mui/material'
import { IconButtonAnimate } from '../../components';
import {colorPalets} from './ColorPallet'
import PropTypes from 'prop-types'
import {ResumeState} from '../../contexts/ResumeContext'
import {useLocalStorage} from '../../hooks'

ColorTemplate.prototype = {
    sx: PropTypes.object,
    small: PropTypes.bool
};


export default function ColorTemplate ({sx, small}) {


    const {setTemplateColor,templateColor} = ResumeState()
    const handleMouseEnter = (color) => setTemplateColor({...templateColor, current: color})
    const handleMouseLeave = () =>  setTemplateColor({...templateColor, current: templateColor.initial})
    const handleMouseClick = (color) => setTemplateColor({initial: color, current: color})

    return (
        <Stack 
            direction= 'row' 
            spacing= {small ? 0 : 1} alignItems= 'center' justifyContent={'center'} 
            sx= {{...sx}} >
        {colorPalets.map((color, index) => (
          <IconButtonAnimate key= {index}>
            <Box 
                onMouseEnter= {() => handleMouseEnter(color)}
                onMouseLeave= {handleMouseLeave}
                onClick= {() => handleMouseClick(color)}
                variant= 'span'
                sx= {{
                borderRadius: '100%',
                height: small ? 20 : 26,
                width: small ? 20 : 26,
                bgcolor: color && color,
                border: !color && '2px solid grey',
                cursor: 'pointer',
                transition: '0.4s',
                boxShadow: color && templateColor?.initial !== color && '3px 3px 5px 0px grey',
                '&:hover': {
                    opacity: 0.6
                }
                }}
            />
            {
                 templateColor?.initial == color &&
                <Box 
                sx= {{
                    background: 'none',
                    border: '2px solid orange',
                    borderRadius: '100%', 
                    height: small ? 30 : 36,
                    width: small ? 30 : 36,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            />}
          </IconButtonAnimate>
        ))}
        </Stack>
    )
}