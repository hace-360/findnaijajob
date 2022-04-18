import {useState, useContext, createContext, useEffect} from 'react'
import { useLocalStorage } from '../hooks'
import data from '../sections/new-resume/Templates/userData'

const StateContext = createContext()

export default function ResumeContextProvider ({children}) {

    // resume color -------------------  
    const [templateColor, setTemplateColor] = useLocalStorage('templateColor', {initial: '', current: ''})
    const [activeTemplate, setActiveTemplate] = useLocalStorage('activeTemplate', '')
    const [activeStep, setActiveStep] = useLocalStorage('activeStep', 0)


    // contact
    const [contact, setContact] = useLocalStorage('contact', contactSchema)
    const resetContact = () => setContact({...contactSchema})
    // page title
    const [pageTitle, setPageTitle] = useLocalStorage('page-title', '')
    const [pageSize, setPageSize] = useLocalStorage('page-size', 'a4')

    // experience
    const [experience, setExperience] = useLocalStorage('experiance', experienceSchema)
    const [allExp, setAllExp] = useLocalStorage('allExp', [])
    const resetExperience = () => setExperience({...experienceSchema})

    // skills
    const [skills, setSkills] = useLocalStorage('skills', [])

    // languages
    const [language, setLanguage] = useLocalStorage('language', {name: '', level: ''})
    const [allLang, setAllLang] = useLocalStorage('allLang', [])
    const resetLang = () => setLanguage({name: '', level: ''})
    // 
    const [hobbies, setHobbies] = useLocalStorage('hobbies', [])
    const [summary, setSummary] = useLocalStorage('summary', '')

    // reference
    const [reference, setReference] = useLocalStorage('reference', referenceSchema)
    const [allRef, setAllRef] = useLocalStorage('allRef', [])

    // education
    const [education, setEducation] = useLocalStorage('education', educationSchema)
    const [allEdu, setAllEdu] = useLocalStorage('allEdu', [])
    const resetEducation = () => setEducation({...educationSchema})

    // certificate
    const [certificate, setCertificate] = useLocalStorage('certificate', certfiicateSchema)
    const [allCert, setAllCert] = useLocalStorage('allCert', [])
    const resetCert = () => setCertificate({...certfiicateSchema})

    //
    const userData = {
        contact: contact.firstName && contact.email ? contact : data.contact,
        education: allEdu.length > 0 ? allEdu : data.education,
        experience: allExp.length > 0 ? allExp : data.experience,
        summary: summary.length > 0 ? summary : data.summary,
        skills: skills.length > 0 ? skills : data.skills,
        hobbies: hobbies.length > 0 ? hobbies : data.hobbies,
        reference: allRef.length > 0 ? allRef : data.reference,
        certificate: allCert.length > 0 ? allCert : data.certificate,
        language: allLang.length > 0 ? allLang : data.language
    }


    return (
        <StateContext.Provider value={{
            templateColor,
            setTemplateColor,
            activeTemplate,
            setActiveTemplate,
            activeStep,
            setActiveStep,
            contact,
            setContact,
            resetContact,
            // experience
            experience,
            setExperience,
            allExp,
            setAllExp,
            resetExperience,
            // 
            skills,
            setSkills,

            // language
            language,
            setLanguage,
            allLang,
            setAllLang,
            resetLang,
            //
            hobbies,
            setHobbies,
            // 
            summary,
            setSummary,
            // ref
            allRef,
            setAllRef,
            reference,
            setReference,
            // education
            education,
            setEducation,
            setAllEdu,
            allEdu,
            resetEducation,
            // userdata
            userData,
            // certficate
            certificate,
            setCertificate,
            allCert,
            setAllCert,
            resetCert,
            // Page title
            pageTitle,
            setPageTitle,
            // page size
            pageSize,
            setPageSize
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const ResumeState = () => useContext(StateContext)



// ---------------------------
const contactSchema= {
        firstName: '',
        title: '',
        social: {
            linkedin: '',
            facebook: '',
            twitter: '',
            instagram: '',
            website: ''
        },
        lastName: '',
        photoURL: {},
        previewImg: '',
        phone: '',
        email: '',
        address: {
            street: '',
            state: '',
            country: '',
            city: ''
        }
    }
// 
const experienceSchema = {
    address: {
        street: '',
        state: '',
        country: '',
        city: ''
    },
    title: '',
    employer: '',
    startDate: '',
    endDate: '',
    active: false,
    description: '',
}

const referenceSchema = {
    name: '',
    position: '',
    description: '',
    phone: '',
    email: ''
  }

  const educationSchema = {
    name: '',
    address: {
        street: '',
        state: '',
        country: '',
        city: ''
    },
    major: '',
    qualification: '',
    startDate: '',
    endDate: '',
    active: false,
  }

  const certfiicateSchema= {
      name: '',
      authority: '',
      description: '',
      date: ''
  }