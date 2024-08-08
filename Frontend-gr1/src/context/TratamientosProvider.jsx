import { createContext, useState} from "react"
import axios from 'axios'

const TratamientosContext = createContext()

const TratamientosProvider = ({ children }) => {
    const [modal, setModal] = useState(false)
    const [tratamientos, setTratamientos]=useState([])

    const handleModal =()=>{
        setModal(!modal)
    }
    const registrarTratamientos = async(datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/registro`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.post(url,datos,options)
            setTratamientos([respuesta.data.tratamiento,...tratamientos])
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async (id, newData) => {
        try {
            const token = localStorage.getItem('token')
            const url = `${process.env.VITE_BACKEND_URL}/tratamiento/${id}`
            const urlP = `${process.env.VITE_BACKEND_URL}/paciente/${newData.paciente}`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, newData, options);
            const respuesta = await axios.get(urlP, options)
            console.warn("Tratamientos", respuesta.data.tratamientos)
            setTratamientos(respuesta.data.tratamientos)
        } catch (error) {
            console.log(error);
        }
    }

    const handleState = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro que desea dar de baja el tratamiento?')
        if (!confirmacion) return
        try {
            const token = localStorage.getItem('token')
            const url = `${process.env.VITE_BACKEND_URL}/tratamiento/${id}`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const tratamientoBuscar = await axios.get(url, options)
            const tratamiento = tratamientoBuscar.data
            tratamiento.estado = false
            console.log(tratamiento)
            const respuesta = await axios.put(url, tratamiento, options)
            const tratamientosActualizados = tratamientos.filter(tratamiento => tratamiento._id !== id)
            setTratamientos(tratamientosActualizados)
            console.log(respuesta.data)
        } catch (error) {
            console.log({ respuesta: error.response.data.msg, tipo: false })
        }
        console.log(id)
    }

    const handleDelete = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de eliminar el tratamiento?')
        if (!confirmacion) return
        try {
            const token = localStorage.getItem('token')
            const url = `${process.env.VITE_BACKEND_URL}/tratamiento/${id}`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.delete(url, options)
            const tratamientoFiltrado = tratamientos.filter(tratamiento => tratamiento._id !== id)
            setTratamientos(tratamientoFiltrado)
            
        } catch (error) {
            console.log({ respuesta: error.response.data.msg, tipo: false })
        }
    }

    return (
        <TratamientosContext.Provider value={
            {
                modal,
                setModal,
                handleModal,
                tratamientos,
                setTratamientos,
                registrarTratamientos,
                handleDelete,
                handleState,
                handleUpdate,
            }
        }>
            {children}
        </TratamientosContext.Provider>
    )
}
export {
    TratamientosProvider
}
export default TratamientosContext