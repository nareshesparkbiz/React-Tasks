import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";



const FormField=(name,type,label,schemaName,placeholder,options,extra,mymethod)=>{
  
  console.log('registerSchema::: ', schemaName);
const [register,errors]=schemaName
 
  console.log('errors::: ',register,errors);

  

    switch(type){
        case "select":
            return(
                <div className="mb-3">
                <label htmlFor={name} className="form-label">
                  {label}
                </label>
                <select
                    
                
                  className="form-select"
                  {...register(name, { required: true })}
              
    
                  aria-label="Default select example"
                >
                  <option value={""}>Select {label}</option>
    
                  {options.map((item, index) => (
                    <option key={item} value={index}>
                      {item}
                      {extra}
                    </option>
                  ))}
                </select>
                <div className="form-text  text-danger ">
            
                  {errors[name]?.message}
                </div>
              </div>
            )
        case 'Date':
            return(
                <div className="mb-3">
                <label  className="form-label" htmlFor={name}  >{label}</label>
                <input
                  name={name}
                  {...register(name, { required: true })}
                  className="form-control"
                  type="date"
                  placeholder={name}
                  onChange={e=>{mymethod(e)}}
                />
                  <div className="form-text  text-danger ">  {errors[name]?.message}</div>
              
              </div>
            )
        case 'checkbox':
            return(
              <>
                {options.map((item, index) => (
                    <div class="form-check" key={index}>

                    <input class="form-check-input" type="checkbox" namer={name} id={item}/>
                 <label class="form-check-label" htmlFor={item}>
                       {item}
                  </label>
                    </div>

                ))}

             </>
             
            
            )
        case 'radio':
            return(
                <>
                 <div className="mb-3">
                {options.map((item, index) => (
                   <div class="form-check" key={index}>
                   <input class="form-check-input" type="radio" name={name} id={item} />
                   <label class="form-check-label" for={item}>
                     {item}
                   </label>
                 </div>

                ))}
                   <div i className="form-text text-danger">
               
               {errors[name]?.message}
               </div>
                </div>

                </>
            )
        case 'textarea':
            return(
                <div className="mb-3">
                <label htmlFor={label} className="form-label">
                  {label}
                </label>
                <div className="form-floating">
                  <textarea
                  onChange={e=>{mymethod(e)}}
                    className="form-control"
                    {...register(name, { required: true })}
              
                    placeholder={placeholder}
                    id="floatingTextarea"
                  ></textarea>
                  <label htmlFor="floatingTextarea">{label}</label>
                </div>
                <div i className="form-text text-danger">
               
                {errors[name]?.message}
                </div>
              </div>
            )
        case "button":
            return(
              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button type={name} className="btn btn-primary btn-lg"  {...register(name, { required: true })}>{label}</button>
            </div>

            )

       default: return (
        
       <div className="d-flex flex-row align-items-center mb-4">
       <i className="fas fa-user fa-lg me-3 fa-fw"></i>
       <div className="form-outline flex-fill mb-0">
            <label htmlFor={name} className="form-label"> {label}</label>
            <input
              name={name}
              className="form-control" 
              {...register(name, { required: true })}
              type={type}
              
              placeholder={placeholder}
            />
            <div i className="form-text text-danger">
               
    
            {errors[name]?.message}
                </div>
          </div>
          </div>
      
        );
    }



}


export default FormField;