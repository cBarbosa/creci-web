import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { phoneNumber } from '../../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormData } from '../../models/User';
import InputMask from 'react-input-mask';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

export interface ILoginPageProps {};

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {

    const { handleLogin, authenticated } = useAuth();
    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
        // phone: yup.string().matches(phoneNumber)
    });

    const initialValues = {
        username: '',
        password: ''
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema)
    });

    const _handleFormSubmit = async (e:any) => {
        e.preventDefault();

        let email = e.target.elements.email?.value;
        let password = e.target.elements.password?.value;

        console.log(email, password);
    };

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        await handleLogin(data.username.replaceAll('.', '').replaceAll('-', ''), data.password);
        setLoading(false);
    };

    const onError = (error: any) => {
        toast.error(error);
    };

    function beforeMaskedStateChange({ nextState }:any) {

console.log(nextState);

        let { value } = nextState;
        if (value.endsWith(".") || value.endsWith("-")) {
          value = value.slice(0, -1);
        }
      
        return {
          ...nextState,
          value
        };
    }

    const classValues = {
        "input": "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none",
        "button": "inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
    };

    if(loading) {
        return <h1>loading</h1>
    }

    return(
        <>
            <section className="h-screen">
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                
                <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                    <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                    className="w-full"
                    alt="Phone image"
                    />
                </div>

                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                    <form onSubmit={handleSubmit(onSubmit, onError)} >
                    {/* Email input  */}
                    <div className="mb-6">
                        <InputMask
                            mask="999.999.999-99"
                            className={classValues.input}
                            placeholder="Ex: 111.111.111-11"
                            alwaysShowMask={false}
                            maskPlaceholder={null}
                            // maxLength={14}
                            {...register('username')}
                            beforeMaskedStateChange={beforeMaskedStateChange}
                        />
                        {errors?.username?.type && (
                            <div className="text-red-600">
                                {errors.username.message}
                            </div>
                        )}
                    </div>

                    {/* Password input */}
                    <div className="mb-6">
                        <input
                            type="password"
                            className={classValues.input}
                            placeholder="Senha de acesso"
                            maxLength={20}
                            {...register('password')}
                        />
                        {errors?.password?.type && (
                            <div className="text-red-600">
                                {errors.password.message}
                            </div>
                        )}
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className={classValues.button}
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                    >
                        Entrar
                    </button>

                    {/* <div
                        className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                    >
                        <p className="text-center font-semibold mx-4 mb-0">OU</p>
                    </div> */}

                    {/* <a
                        className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                        // style="background-color: "
                        role="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                    > */}
                        {/* Facebook */}
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        className="w-3.5 h-3.5 mr-2"
                        > */}
                        {/* Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                        {/* <path
                            fill="currentColor"
                            d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                        /></svg>Continue with Facebook
                    </a> */}
                    {/* <a
                        className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                        // style="background-color: #55acee"
                        href="#!"
                        role="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                    > */}
                        {/* Twitter */}
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-3.5 h-3.5 mr-2"
                        > */}
                        {/* ! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                        {/* <path
                            fill="currentColor"
                            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                        /></svg>Continue with Twitter
                    </a> */}
                    </form>
                </div>
                
                </div>
            </div>
            </section>
        </>
    );
};

export default LoginPage;
