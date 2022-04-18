import {useState, useContext, createContext, useEffect} from 'react'
import { useLocalStorage } from '../hooks'
import data from '../sections/new-resume/Templates/userData'

const StateContext = createContext()

export default function LetterContextProvider ({children}) {

    // resume color -------------------  
    const [letterSize, setLetterSize] = useLocalStorage('letterSize', 'normal')
    const [letterType, setLetterType] = useLocalStorage('letterType', 'organized')
    const [letterCategory, setLetterCategory] = useLocalStorage('letterCategory', 'experienced')
    const [letterTitle, setLetterTitle] = useLocalStorage('letterTitle', '')
    const [letterSection, setLetterSection] = useLocalStorage('letterSection', [])

    return (
        <StateContext.Provider value={{
            // letter size
            letterSize,
            setLetterSize,
            // letter type
            letterType,
            setLetterType,
            // category
            letterCategory,
            setLetterCategory,
            // letter title
            letterTitle,
            setLetterTitle,
            // letter section
            letterSection,
            setLetterSection
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const LetterState = () => useContext(StateContext)



// ---------------------------