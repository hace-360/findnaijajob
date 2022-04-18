

export function parseEducation ({setAllEdu, allEdu, payload}) {

    if (payload.length > 0) {
        const parsed = payload.map( edu => {
            const {organization, dates, accreditation, location} = edu

            const education = {
                name: organization || '',
                address: {
                    street: `${location?.streetNumber || ''} ${location?.street || ''}`,
                    state: location?.state || '',
                    country: location?.country || '',
                    city: location?.city || ''
                },
                major: accreditation?.inputStr && accreditation?.inputStr.split(',').length > 0 ? accreditation?.inputStr.split(',')[1] : '' || '',
                qualification: accreditation?.educationLevel || '',
                startDate: dates?.startDate || '',
                endDate: dates?.completionDate || '',
                active: dates?.isCurrent || ''
            }
            return education
        })
        return setAllEdu([...parsed])
    }
}

// 

export function parseContact ({setContact, payload}) {
    const {
        name,
        phoneNumbers,
        emails,
        websites,
        linkedin,
        profession,
        location
    } = payload

    setContact({
        firstName: name?.first || '',
        lastName: name?.last || '',
        photoURL: {},
        title: profession || '',
        previewImg: '',
        phone: phoneNumbers?.length > 0 ? phoneNumbers[0] : '',
        email: emails[0] || '',
        social: {
            linkedin: linkedin || '',
            website: websites?.length > 0 ? websites[0] : ''
        },
        address: {
            street: `${location?.streetNumber || ''} ${location?.street || ''}`,
            state: location?.state || '',
            country: location?.country || '',
            city: location?.city || ''
        }
    })
    return
}

// experience
export function parseExperience ({setAllExp, payload}) {

    if (payload.length > 0) {
        const parsed = payload.map(exp => {
            const {location, jobTitle, organization, dates: {startDate, isCurrent, endDate}, jobDescription } = exp
            const experience = ({
                address: {
                    street: `${location?.streetNumber || ''} ${location?.street || ''}`,
                    state: location?.state || '',
                    country: location?.country || '',
                    city: location?.city || ''
                },
                title: jobTitle || '',
                employer: organization || '',
                startDate: startDate || '',
                endDate: endDate || '',
                active: isCurrent || '',
                description: jobDescription || '',
            })
            return experience
        })
        return setAllExp([...parsed])
    }
}

export function parseRef ({setAllRef, allRef, payload}) {

    if (payload.length > 0) {
        const parsed = payload.map(ref => {
            const {name, text, email, number} = ref
            const refs = {
                name: name || '',
                position: '',
                description: text || '',
                phone: number || '',
                email: email || ''
            }
            return refs
        })
        return setAllRef([...parsed])
    }
}