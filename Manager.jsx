import React, { useEffect } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const [form, setform] = useState({ site: "", username: "", Password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPassword = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)



    }



    useEffect(() => {
        getPassword()


    }, [])
    const copyText = (text) => {

        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        alert('show the Password')
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.Password.length > 3) {

            // if its deleted 

             await fetch("http://localhost:3000/", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ id:  form.id }) })


            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "post", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])
            setform({ site: "", username: "", Password: "" })

        }
        else {
            alert("Your letters should be have 3")
        }

    }
    const deletPassword = async (id) => {
        console.log("deleting password", id)
        let c = confirm("You really wants to delete your Password")
        if (c) {


            setpasswordArray(passwordArray.filter(item => item.id !== id))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({  id }) })
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
    }
    const editPassword = (id) => {
        console.log("editing password", id)
        let b = confirm("you wants to edit")
        if (b) {


            setform({...passwordArray.filter(i => i.id === id)[0], id: id})
            setpasswordArray(passwordArray.filter(item => item.id !== id))
        }
    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }



    return (
        <>

            <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className=" p-2 md:px-0  md:mycontainer ">
                <h1 className='text-xl font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>
                    PassHand
                    <span className='text-green-700'>/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center font-bold'>Your Own Password Manager</p>
                <div className=" flex flex-col p-4 text-black gap-8 items-center">
                    <input className='rounded-xl border border-green-700 p-3 py-1 w-full' placeholder='Enter Website URL' value={form.site} onChange={handlechange} type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row justify-between w-full gap-8">
                        <input className='rounded-xl border border-green-700 p-3 py-1 w-full' placeholder='Enter Username' value={form.username} onChange={handlechange} type="text" name="username" id="username" />

                        <div className="relative">
                            <input className='rounded-xl border border-green-700 p-3 py-1 w-full' placeholder='Enter Password' value={form.Password} onChange={handlechange} type="text" name="Password" id="password" />
                            <span className="absolute right-1 cursor-pointer" onClick={showPassword}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/dicvhxpz.json"
                                    trigger="hover">

                                </lord-icon>


                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center rounded-full bg-green-300 text-black hover:bg-green-600 px-4 py-2 w-fit gap-2 ' >
                        <lord-icon
                            src="https://cdn.lordicon.com/awjeikyj.json"
                            trigger="hover">

                        </lord-icon>
                        Save Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-2'>Your PassWords</h2>
                    {passwordArray.length === 0 && <div>No passwords shown</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className='bg-slate-600 text-white '>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-slate-200'>

                            {passwordArray.map((item, index) => {
                                return <tr key={index}>

                                    <td className='  text-center  py-2 border border-white'>
                                        <div className='flex justify-center items-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='copyicon size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "padding-top": "3px", "padding-left": "3px" }}

                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover">


                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    <td className=' text-center  py-2 border border-white'>
                                        <div className='flex justify-center items-center'>
                                            <span>{item.username}</span>
                                            <div className='copyicon size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "padding-top": "3px", "padding-left": "3px" }}
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover">


                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' text-center  py-2 border border-white'>
                                        <div className='flex justify-center items-center'>
                                            <span>{"*".repeat(item.Password.length)}</span>
                                            <div className='copyicon size-7 cursor-pointer' onClick={() => { copyText(item.Password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "padding-top": "3px", "padding-left": "3px" }}
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover">


                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' text-center  py-2 border border-white'>
                                        <span className='cursor-pointer mx-2' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/fikcyfpp.json"
                                                trigger="hover"
                                                stroke="bold"
                                                colors="primary:#000000,secondary:#000000"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-2' onClick={() => { deletPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/xyfswyxf.json"
                                                trigger="hover"
                                                colors="primary:#000000"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>

                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}

                </div>
            </div >
        </>
    )
}

export default Manager