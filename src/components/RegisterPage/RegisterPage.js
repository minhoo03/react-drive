import React from 'react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

export default function RegisterPage() {

    const { register, watch, errors } = useForm({mode: 'onChange'})

    const password = useRef()
    password.current = watch('password')
    console.log(watch('email','name','password'))

    return (
        <div className="auth_wrapper">
            <div>
                <h3>
                    Register
                </h3>
            </div>

            <form 
            // onSubmit={handleSubmit(onSubmit)}
            >
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

                <input type="submit" />
            </form>
        </div>
    )
}
