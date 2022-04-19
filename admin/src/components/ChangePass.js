import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function ForgotPass() {

    const [pass, setPass] = useState('')
    const [message, setMessage] = useState('')

    // const {token} = useParams()
    const navigate = useNavigate() 

    const handleSubmit = async () => {

        try {
            
            const response = await axios.post('/admin/changePassword', {pass})

            console.log('reponse is', response)

            if (response.data.success) {
                setMessage('Password changed successfully')
            } else {
                setMessage('There was a problem changing your password')
            }
        } catch (error) {

            console.log('error is', error.message)
            setMessage('There was a problem changing your password')
            
        }

    }

    return <div className="container">
        <p>Please type your new password</p>
        <input placeholder="Type your password" value={pass} onChange={e => setPass(e.target.value)}/>
        <button onClick={handleSubmit}>Submit</button>
        <p>{message}</p>
    </div>
}