// import joi from 'joi'


export default function Values () {

    return ({
        name: '',
        title: '',
        email: '',
        photoURL: '',
        phone: '',
        address: '',
        skills: [],
        objective: '',
        hobbies: [],
        education: [],
        experience: [],
        certificates: [],
        language: [],
        reference: [],
        honors: []
    })
}

// export function ResumeValidator () {

//     return (
//         joi.object({

            // email: joi.string()
            //         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'co'] } })
            //         .required()
            //         .label('Email'),
    
            // photoURL: joi.string()
            //             .label('Photo'),
    
            // name: joi.string()
            //             .required()
            //             .label('Name'),
            // title: joi.string()
            //             .allow('')
            //             .label('Professional title'),
    
            // address: joi.object({
    
            //     city: joi.string()
            //         .required(),
            //     state: joi.string()
            //             .required(),
            //     street: joi.string()
            //             .required(),
            //     number: joi.string()
            //             .required(),
            //     country: joi.string()
            //             .default('NG')
            //             .required()
            // }),
            // objective: joi.string()
            //         .required(),
    
            // hobbies: joi.array(),
            
            // skills: joi.array(),
    
            // education: joi.array().items({
            //     startDate: joi.date()
            //             .required()
            //             .label('Start date'),
    
            //     endDate: joi.date()
            //             .allow('')
            //             .label('End date'),
    
            //     major: joi.string()
            //             .required(),
    
            //     degree: joi.string()
            //             .required(),
    
            //     institution: joi.string()
            //             .required(),
            // }),
    
            // language: joi.array().items({
            //     name: joi.string()
            //             .required(),
            //     level: joi.number()
            //             .required()
            //             .min(1)
            //             .max(10)
            // }),
    
            // reference: joi.array().items({
            //     name: joi.string()
            //         .required(),
            //     position: joi.string()
            //             .required(),
            //     phone: joi.string()
            //             .required(),
            //     description: joi.string()
            //             .required(),
            //     email: joi.string()
            //             .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'co'] } })
            //             .required()
            //             .label('Email'),
            // }),
    
            // honors: joi.array().items({
            //     name: joi.string()
            //         .required(),
            //     subtitle: joi.string()
            //             .required(),
            //     description: joi.string()
            //             .required()
            // }),
    
            // certificate: joi.array().items({
            //     name: joi.string()
            //         .required(),
            //     authority: joi.string()
            //             .required(),
            //     description: joi.string()
            //             .required(),
            //     year: joi.date()
            //         .required()
            // }),
    
            // experience: joi.array().items({
            //     name: joi.string()
            //         .required(),
    
            //     startDate: joi.date()
            //             .required()
            //             .label('Start date'),
    
            //     endDate: joi.date()
            //             .allow('')
            //             .label('End date'),
    
            //     role: joi.string()
            //             .required(),
    
            //     description: joi.string()
            //             .required(),
            // })
//         })
//     )
// }