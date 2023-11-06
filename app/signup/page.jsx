import { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useAuth } from '../context/Auth';

import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
export default function signup(){
    return(
        <main>
            <h1>SignUp</h1>
            <div className='flex justify-center items-center mt-6'>


    <input placeholder='Email' type="text" className='text-center text-black' />
    <input placeholder='Password' type="text" className='text-center text-black ml-10' />
    <button className='ml-5 bg-white text-black w-20'>Submit</button>
    </div>

        </main>
    )
}