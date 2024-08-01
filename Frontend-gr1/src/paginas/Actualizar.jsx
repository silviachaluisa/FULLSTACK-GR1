import React from 'react'
import { Formulario } from '../componets/Formulario'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas';
import axios from 'axios';

const Actualizar = () => {
    const { id } = useParams()
    const [paciente, setPaciente] = useState({})
    const [mensaje, setMensaje] = useState({})

    useEffect(() => {
        const consultarPaciente = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                setPaciente(respuesta.data.paciente)

            } catch (error) {
                console.log(error)
            }
        }
        consultarPaciente()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar un paciente 😊 </p>
            {
                Object.keys(paciente).length !=0?
                (
                    <Formulario paciente={paciente} />
                )
                :
                (
                    <p>No existe ese paciente</p>
                )
            }
        </div>
    )
}

export default Actualizar