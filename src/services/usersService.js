import * as Yup from "yup";

export function saveActivity(activity){
 
  var activityLS = JSON.parse(localStorage.getItem("saveActivityData")) || [];
  var currentDate =  Date().toLocaleString();
  var  activityObj = {
    activity: activity ,
    Time : currentDate
  };
  activityLS.push(activityObj);
  localStorage.setItem("saveActivityData", JSON.stringify(activityLS));
  }
export const getUsers=()=>{
  const users = JSON.parse(localStorage.getItem("Users")) || [];
  return users;
}

export const userLogin=({email, password})=>{
  const users= getUsers();
  const results = users.find(function (entry) {
      return entry.email === email && entry.password ==password;
  });
  if( results){
    saveActivity("Login successfully");
  }
  return results;
}



export const  login_schema = ()=>{
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email address format")
          .required("Email is required"),
        password: Yup.string()
          .min(3, "Password must be 3 characters at minimum")
          .required("Password is required"),
      });

      return LoginSchema ;
}