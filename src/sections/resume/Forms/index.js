import Certificate from './certificate';
import Personal from './personalInfo';
import Education from './education';
import Experience from './experience';
import Hobbies from './hobbies';
import Language from './language';
import Objective from './objective';
import Reference from './reference';
import Skills from './skills';


export default function Index ({form, setForm, getForm}) {

    return ([
        {
            label: 'personal info',
            component: <Personal form= {form} setForm= {setForm} />
        },
        {
            label: 'Objectives',
            component: <Objective form= {form} setForm= {setForm} />
        },
        {
            label: 'skills',
            component: <Skills form= {form} setForm= {setForm}  />
        },
        {
            label: 'hobbies',
            component: <Hobbies form= {form} setForm= {setForm} />
        },
        {
            label: 'education',
            component: <Education form= {form} setForm= {setForm} />
        },
        {
            label: 'experiance',
            component: <Experience form= {form} setForm= {setForm} />
        },
        {
            label: 'certification',
            component: <Certificate form= {form} setForm= {setForm} />
        },
        {
            label: 'reference',
            component: <Reference form= {form} setForm= {setForm} />
        },
        
        {
            label: 'language',
            component: <Language form= {form} setForm= {setForm} />
        }
    ])
}