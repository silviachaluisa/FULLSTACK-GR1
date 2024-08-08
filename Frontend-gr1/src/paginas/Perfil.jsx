import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { CardPerfil } from '../componets/Perfil/CardPerfil'
import { CardPerfilPaciente } from '../componets/Perfil/CardPerfilPaciente'
import FormularioPerfil from '../componets/Perfil/FormularioPerfil'
import Password from '../componets/Perfil/Password'

const Perfil = () => {
    const { auth } = useContext(AuthContext)
    
    return (
        <>       
           {
                        "propietario" in auth ? 
                        <div>

                        <h1 className='font-black text-4xl text-gray-500'>Perfil del paciente</h1>
                        <hr className='my-4' />
                        <p className='mb-8'>Este módulo te permite visualizar el perfil del paciente</p>
                    </div>
                        :(
                    <div>

                        <h1 className='font-black text-4xl text-gray-500'>Perfil del veterinario</h1>
                        <hr className='my-4' />
                        <p className='mb-8'>Este módulo te permite visualizar el perfil del veterinario</p>
                    </div>
                        )
                }
            {
                "propietario" in auth ? <CardPerfilPaciente/> : (
                <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                    <div className='w-full md:w-1/2'>
                        <FormularioPerfil/>
                    </div>
                    <div className='w-full md:w-1/2'>
                        <CardPerfil/>
                        <Password/>
                    </div>
                </div>
                )
            }
            
        </>

    )
}

export default Perfil