import axios from 'axios'
import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate,useLocation,Link } from 'react-router-dom'
import validator from 'validator'
import { LoginUser } from './authSlice'
import Success from './success_notification'
import Fail from './fail_notification'

function LogIn() {
  const navigate = useNavigate()
  const dispatch=useDispatch()
// const [search]=useSearchParams()
// const {search}=useLocation()
// const sp=new URLSearchParams(search)
// const redirect=sp.get('redirect') || '/order'
// const isLogin=search.get('redirect')==='login'

// const {userinfo}=useSelector(state=>state.auth)

const [user, setUser] = useState({
  email: '',
  password: ''
})

const [status,setstatus]=useState({type:''})
const [error, setError] = useState({
  emailempty: '',
  emailat:'',
  password: '',

})

const handleUnit = (e) => {
  const name = e.target.name
  const value = e.target.value
  setUser({ ...user, [name]: value })
 
}

// useEffect(()=>{
//   if(userinfo){
//     navigate(redirect)
//   }
// },[navigate,userinfo])


function testify(){
  setTimeout(()=>{
    return navigate('/');
  },3000)
}

const submit = async (e) => {
  e.preventDefault()

  if (validator.isEmpty(user.email)) {
    return setError({ ...error, emailempty: `Email field required` })
  }

 setError({...error,email:''})



 if(!validator.isEmail(user.email)){
  return setError({...error,emailat:`invalid email`})
 }
 setError({...error,emailat:''})
  if (validator.isEmpty(user.password)) {
    return setError({ ...error, password: `password field required` })
  }



  setError({...error,password:''})
  // if (!validator.isEmpty(user.password)) {
  //   return setError({ ...error, password: ''})
  // }

  const newUser = {
    email: user.email,
    password: user.password
  }
  try {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,newUser,{
    withCredentials:true
  })

const data=response.data
dispatch(LoginUser(data))
console.log(data)
setstatus({type:'success'})
// toast.success(`You signed in successfully`)
testify()

  
}

catch (err){
  // setError({...error,login:`* Invalid email or password`})

 setstatus({type:'fail'})
 
//  toast.error(`* Invalid email or password`)
  console.log(err)
}
}

function failing(){
  setTimeout(()=>{
    const message=document.getElementById('fail')
    message?.remove()
  },3000)
}

  return (
    <>
    <div className='flex justify-center items-center mb-24'>
       <div className="w-full max-w-xs mt-14">
       
        <form noValidate className='bg-white shadow-[1px_1px_8px_2px_rgba(0,0,0,0.1)] border-2  px-8 pt-6 pb-8 mb-4' onSubmit={submit}>
          <div>

            <input type="email"  className='shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="email" onChange={handleUnit} value={user.email} placeholder='Email' required />
             {validator.isEmpty(user.email) && <span className='text-red-500'>{error.emailempty}</span> || !validator.isEmail(user.email) && <span className='text-red-500'>{error.emailat}</span>}
           
          </div><br />
          <div>

            <input type="password" className='shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="password" onChange={handleUnit} value={user.password} placeholder='Password' required />
            {validator.isEmpty(user.password) && <span className='text-red-500'>{error.password}</span>}
          </div><br /><br />
        
          <div className='flex justify-center items-center'>

            <input type="submit" className='bg-black hover:bg-opacity-75 text-white text-base font-semibold py-1 px-20 cursor-pointer border border-blue-700 rounded'  name='submit' value='sign in' />

          </div><br />
          <div className='flex justify-center items-center'>
          <p>
            New here? <Link to='/register' style={{color:`blue`}}>Sign up</Link>
          </p>
          </div>
          
          
        </form>
        {status.type=='success' && <Success message={`You signed in successfully`}/> }
          {status.type=='fail' && <div id="fail"><Fail message={`Failed attempt`}/></div> }
          
          {status.type=='fail' && failing() }
     
      </div>
      </div>
    </>
  )
}

export default LogIn