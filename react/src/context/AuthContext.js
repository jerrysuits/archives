
import {createContext,useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export const AuthContext = createContext()

export function AuthProvider({children}) 
{
    const nav = useNavigate()
    const [onChange, setonChange] = useState(false)
    const [current_user, set_currentUser] =useState()

    // Login
    const login = (username, password) =>{
        fetch("/auth/login", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({username, password})
        })
        .then((res)=>res.json())
        .then((response)=>{
            console.log(response)
            if(response.error)
            {
                Swal.fire(
                    'Error',
                    response.error,
                    'error'
                  )
            }
            else if(response.success)
            { 
                nav("/")
                Swal.fire(
                    'Great',
                    response.success,
                    'Great'
                  )
                  setonChange(!onChange)
            }
            else{
                Swal.fire(
                    'Error',
                    "Something went wrong",
                    'error'
                  )
            }

        })
    }
    // Logout
    const logout = () => {
     fetch("/auth/logout", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
     })
       .then((res) => res.json())
       .then((response) => {
         Swal.fire('Success', "You have logged out", 'success');
         nav("/login");
         set_currentUser(null); // Set current_user to null
         setonChange(!onChange);
       });
   };
   


    // Fetch current user
    useEffect(() => {
     fetch("/current_user", {
       method: "GET",
       headers: { "Content-Type": "application/json" },
     })
       .then((res) => res.json())
       .then((response) => {
         console.log(response);
         if (response.currentUser && response.currentUser.id) {
           set_currentUser(response.currentUser);
         }
       });
   }, [onChange]);
 
   

   const contextData = {
    login,
    logout, 
    current_user
    }
  return (
    <AuthContext.Provider value={contextData}>
       {children}
    </AuthContext.Provider>
  )
}