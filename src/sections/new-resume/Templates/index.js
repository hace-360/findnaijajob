import Template1 from './template1'
import Template2 from './template2'
import Template3 from './template3'
import Template4 from './template4'
import Template5 from './template5'
import Template6 from './template6'
import Template7 from './template7'
import Template8 from './template8'
import Template9 from './template9'
import Template10 from './template10'
import Template11 from './template11'
import Template12 from './template12'
import Template13 from './template13'
import Template14 from './template14'
import Template15 from './template15'
import Template16 from './template16'
import Template17 from './template17'
import Template18 from './template18'
import data from './userData'
import {ResumeState} from '../../../contexts/ResumeContext'


export default function GetTemplate ({name, sx, componentRef, form= data}) {

  const {templateColor} = ResumeState()

  return (
    <div style= {{...sx}} id= 'main_document'>
      {
        name == 'traditional2' ? <Template1 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef} /> :
        name == 'smart' ? <Template2 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> :
        name == 'strong' ? <Template3 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> :
        name == 'trendy' ? <Template4 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> :
        name == 'grungy' ? <Template5 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> : 
        name == 'original' ? <Template6 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> :
        name == 'restrained' ? <Template7 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> :
        name == 'rugged' ? <Template8 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> : 
        name == 'classic' ? <Template9 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> : 
        name == 'standout' ? <Template10 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> :
        name == 'executive' ? <Template11 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> :
        name == 'trusted' ? <Template12 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> :
        name == 'contemporary' ? <Template13 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> : 
        name == 'fresh' ? <Template14 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> : 
        name == 'insightful' ? <Template15 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> : 
        name == 'managerial' ? <Template16 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> : 
        name == 'creative' ? <Template17 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> : 
        name == 'acclaimed' ? <Template18 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef}/> : 
        <Template1 sx= {sx} color= {templateColor?.current} user= {form} ref= {componentRef} />
      }
    </div>
  )
}


// export default function Template ({number, form= data, componentRef, sx}) {

//   const {templateColor} = ResumeState()


//   return (
//     <div style= {{...sx}}>
//       {
//           number == 0 ?
//           <Template1 color= {templateColor?.current} user= {form} ref={componentRef} /> :
//           number == 1 ? 
//           <Template2 user= {form}ref={componentRef} /> :
//           number == 2 ? 
//           <Template4 user= {form} ref={componentRef} /> : 
//           number == 3 ? 
//           <Template3 user= {form} ref={componentRef} /> : 
//           <Template1 user= {form} ref={componentRef} />
//       }
//     </div>
//   );
// };

export const TemplateList = [
  'traditional2',
  'smart',
  'strong',
  'trendy',
  'grungy',
  'original',
  'restrained',
  'rugged',
  'classic',
  'standout',
  'executive',
  'trusted',
  'contemporary',
  'fresh',
  'insightful',
  'managerial',
  'creative',
  'acclaimed'
]
