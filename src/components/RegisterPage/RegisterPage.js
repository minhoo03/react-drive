import React from 'react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import md5 from 'md5'

export default function RegisterPage() {

    const { register, watch, errors, handleSubmit } = useForm({mode: 'onChange'})
    const [errorFromSubmit, setErrorFromSubmit] = useState('')
    const [loading, setLoading] = useState(false)

    const password = useRef()
    password.current = watch('password')
    console.log(watch('email','name','password'))

    const onSubmit = async (data) => {
        try{
            setLoading(true)
            let createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password)

            firebase.auth().signOut()

            await createdUser.user.updateProfile({
                displayName: data.name,
                photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
            })

            // table: users / row: user.uid / column: user
            await firebase.database().ref('users').child(createdUser.user.uid).set({
                displayName: createdUser.user.displayName,
                photoURL: createdUser.user.photoURL
            })

            setLoading(false)
        } catch(error) {
            setErrorFromSubmit(error.message)
            setLoading(false)
            setTimeout(() => {
                setErrorFromSubmit('')
            }, 5000);
        }
    }

    return (
        <div className="auth_wrapper">
            <div>
                <h3>
                    Register
                </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    ref={register({ required: true, pattern: /^\S+@\S+$/i})} 
                />
                {errors.email && <p>This field is required.</p>}

                <label>Name</label>
                <input
                    name="name"
                    type="text"
                    ref={register({ required: true, maxLength: 10 })}
                />
                {errors.name && errors.name.type === 'required' && <p>This field is required.</p>}
                {errors.name && errors.name.type === 'maxLength' && <p>Your inpuit exceed maximum length.</p>}

                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    ref={register({ required: true, minLength: 6 })}
                />
                {errors.password && errors.password.type === 'required' && <p>This field is required.</p>}
                {errors.password && errors.password.type === 'minLength' && <p>Your input exceed minimum length.</p>}

                <label>Password Confirm</label>
                <input
                    name="password_confirm"
                    type="password"
                    ref={register({ required: true, validate: value => value === password.current })}
                />
                {errors.password_confirm && <p>The password is not correct.</p>}

                {errorFromSubmit && <p>{errorFromSubmit}</p>}

                <input type="submit" disabled={loading} />
                <Link style={{color: 'gray', textDecoration:'none'}} to="login">이미 아이디가 있다면..</Link>
            </form>
        </div>
    )
}
