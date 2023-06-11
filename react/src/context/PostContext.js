
import {createContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export const PostContext = createContext()

export function PostProvider({children}) 
{
  const nav = useNavigate()
  const [onchange, setonchange] = useState(false)
  const [pictures, setPictures] = useState()

   // Add a Picture
   const AddPicture = (userid, image_file) =>{
    fetch("/pictures/newpicture", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({user_id:userid})
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
              setonchange(!onchange)
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
  // Delete Picture 
  const deletePicture = (id) =>{
    fetch(`/pictures/delete/${id}`, {
        method: "DELETE",
    })
    .then((res)=>res.json())
    .then((response)=>{
      setonchange(!onchange)
        console.log(response)
        nav("/")
        Swal.fire(
          'Great',
          "Delete success",
          'Great'
        )
        nav("/")

    })

}

  // Fetch pictures
  useEffect(()=>{
    fetch("/pictures", {
        method: "GET",
        headers: {"Content-Type":"application/json"}
    })
    .then((res)=>res.json())
    .then((response)=>{
     setPictures(response)
        
    })
}, [onchange])


   const contextData = {
     pictures,
     deletePicture,
     AddPicture
    }
  return (
    <PostContext.Provider value={contextData}>
       {children}
    </PostContext.Provider>
  )
}