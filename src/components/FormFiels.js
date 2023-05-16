import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";



const FormField=(props)=>{
  const {name,type,options,label,extra,error,mymethod,placeholder}=props;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });



  

    switch(type){
        case "select":
            return(
                <div className="mb-3">
                <label htmlFor={name} className="form-label">
                  {label}
                </label>
                <select
                    extra
                
                  className="form-select"
                onChange={(e)=>{mymethod(e)}}
    
                  aria-label="Default select example"
                >
                  <option value={""}>Select {label}</option>
    
                  {options.map((item, index) => (
                    <option key={item} value={index}>
                      {item}
                      {extra.year}
                    </option>
                  ))}
                </select>
                <div className="form-text  text-danger ">
            
                  {errors[name]?.message}
                </div>
              </div>
            )
        case 'date':
            return(
                <div className="mb-3">
                <label  className="form-label" htmlFor={name}  >{label}</label>
                <input
                  name={name}
                  {...register(`${name}`)}
                  className="form-control"
                  type="date"
                  placeholder={name}
                  onChange={(e)=>{mymethod(e)}}
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
                  onChange={(e)=>{mymethod(e)}}
                    className="form-control"
                    {...register(`${name}`)}
              
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
              <button type={name} className="btn btn-primary btn-lg"    {...register(`${name}`)}>{label}</button>
            </div>

            )

       default: return (
          <div className="fields">
            <label htmlFor={name}> {label}</label>
            <input
              name={name}
             extra
              type={type}
               onChange={(e)=>{mymethod(e)}}
              placeholder={placeholder}
            />
            <div i className="form-text text-danger">
               
                {errors}
                </div>
          </div>
        );
    }



}


export default FormField;