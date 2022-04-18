import {Template1} from './template1'
import {Template2} from './template2'
import {Template3} from './template3'
import {Template4} from './template4'



const Template = ({number, form, componentRef}) => {

  const test = ''

  return (
    <div>
      {
          number == 0 ?
          <Template1 user= {form} ref={componentRef} /> : 
          number == 1 ? 
          <Template2 user= {form}ref={componentRef} /> :
          number == 2 ? 
          <Template4 user= {form} ref={componentRef} /> : 
          number == 3 ? 
          <Template3 user= {form} ref={componentRef} /> : 
          <Template1 user= {form} ref={componentRef} />
      }
    </div>
  );
};

export default Template