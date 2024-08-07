import {  useState, useContext } from "react"
import AuthContext from "../context/AuthProvider";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Mensaje from "./Alertas";

export const Formulario = ({paciente}) => {
    const navigate = useNavigate()
    const { auth } = useContext(AuthContext)
    const [mensaje, setMensaje] = useState({})
    const [form, setform] = useState({
        nombre: paciente?.nombre ??"",
        propietario: paciente?.propietario??"",
        email:paciente?.email?? "",
        celular: paciente?.celular?? "",
        convencional:paciente?.convencional?? "",
        sintomas:paciente?.sintomas?? "",
        salida:new Date(paciente?.salida).toLocaleDateString('en-CA',{timeZone:'UTC'}) ??""
    })

    const handleChange = (e) => {
        setform({...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e) => { 
        e.preventDefault()
        //Actualización
        if (paciente?._id) {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/actualizar/${paciente?._id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, form, options)
            navigate('/dashboard/listar')
        }
        else {
		        try {
		            const token = localStorage.getItem('token')
		            form.id = auth._id
		            const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`
		            const options={
		                headers: {
		                    'Content-Type': 'application/json',
		                    Authorization: `Bearer ${token}`
		                }
		            }
		            await axios.post(url,form,options)
								setMensaje({ respuesta:"paciente registrado con exito y correo enviado", tipo: true })
		            setTimeout(() => {
		                navigate('/dashboard/listar');
		            }, 3000);
		        } catch (error) {
                    console.log(error);
                    
                        //setMensaje({ respuesta: error, tipo: false })
		            setTimeout(() => {
		                setMensaje({})
		            }, 3000);
		        }
        }
        
    }

    return (
        
        <form onSubmit={handleSubmit}>
            {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='nombre:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre de la mascota: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre de la mascota'
                    value={form.nombre}
                    name="nombre"
                    onChange={handleChange}

                />
            </div>
            <div>
                <label
                    htmlFor='propietario:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del propietario: </label>
                <input
                    id='propietario'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre del propietario'
                    value={form.propietario}
                    name="propietario"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='email:'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='email del propietario'
                    value={form.email}
                    name={"email"}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='celular:'
                    className='text-gray-700 uppercase font-bold text-sm'>Celular: </label>
                <input
                    id='celular'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='celular del propietario'
                    value={form.celular}
                    name="celular"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='convencional:'
                    className='text-gray-700 uppercase font-bold text-sm'>Convencional: </label>
                <input
                    id='convencional'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='convencional del propietario'
                    value={form.convencional}
                    name="convencional"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='Salida:'
                    className='text-gray-700 uppercase font-bold text-sm'>Fecha de salida: </label>
                <input
                    id='salida'
                    type="date"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='salida'
                    name='salida'
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='sintomas:'
                    className='text-gray-700 uppercase font-bold text-sm'>Síntomas: </label>
                <textarea
                    id='sintomas'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Ingrese los síntomas de la mascota'
                    value={form.sintomas}
                    name="sintomas"
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'                                                                                           
                value={paciente?._id ? 'Actualizar paciente':'Registrar paciente' } />

        </form>
    )
}