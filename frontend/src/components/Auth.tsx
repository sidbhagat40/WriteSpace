import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { SignupInput } from "sidbhagat_medium"
import {BACKEND_URL} from "../../config"
import axios  from "axios"

 
export const Auth = ({type}:{type: "signup"  |  "signin"}) => {

    const [postInputs, setPostInputs] = useState<SignupInput>({
        email:"",
        name:"",
        password:""
    })
    const navigate = useNavigate();
    
    async function sendRequest(){
        
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type ===  "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.jwt
            localStorage.setItem("token",jwt);
            navigate("/posts");

        } catch(e){
            return Response.json({
                msg: "Could not validate request"
            })
        }
    }

    return <div className="flex justify-center h-screen flex-col">
        <div className="flex justify-center">
            <div className="text-4xl font-semibold">
                {type === "signup" ? "Create an Account" : "Sign In"}
            </div>           
        </div>
        <div className="flex justify-center mt-2 font-light text-slate-600">
                {type === "signin" ?"Don't have an account ?" : "Already have an account?"}<span className="underline pl-2"><Link to={type === "signin" ? "/signup" : "/signin"}>
                {type === "signin" ? "Sign Up" : "Sign In"}
                </Link></span>
        </div>
        <div className="flex justify-center mt-15">
            <div className="w-80 space-y-6">
                <LabelledInput label="Email Address" placeholder="user@example.com" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    email: e.target.value
                })
            }}
            />
            {type === "signup" ? <LabelledInput label="Name" placeholder="Enter Full Name" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name: e.target.value
                })
            }}
            /> : null}

            <LabelledInput label="Password" placeholder="Enter Password" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    password: e.target.value
                })
            }}
            />
            <button type="button" onClick={sendRequest} className="w-80 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{type === "signup" ? "Sign Up" : "Sign In"}</button>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type} : LabelledInputType){
    return <div>
            <label className="block mb-2 text-m font-bold text-gray-900 pt-1">{label}</label>
            <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
}
