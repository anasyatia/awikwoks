import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Case from "../../components/case";
import Swal from "sweetalert2";

export default function LendingReturn({data, onClose}) {
    const [forms, setForms] = useState({
        date_time: '',
        total_good_stuff: '',
        total_defec_stuff: ''
    })

    const lending = data

    const [error, setError] = useState([]);

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
        }
    })

    const handleReturnLend = (event) => {
        event.preventDefault();

        instance.post(`restorations/7`, forms)
           .then(res => {
                Swal.fire({
                    icon:'success',
                    title: 'Berhasil mengembalikan barang!',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/lending');
            })
           .catch(err => {
                setError(err.response.data.data)
                console.log(err.response)
            })
    }

    return (
        <div className="items-center m-5 mt-0 pb-10 pt-0">
            {
                Object.keys(error).length > 0 ? (
                    <div role="alert">
                        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                            Gagal!
                        </div>
                        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                            <ul>
                                {
                                    Object.entries(error).map(([key, value], i) => (
                                    <li key={key}>{key != "status" ? i+1 + '. ' + value : ''}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                ) : ''
            }

            {}

            {lending ? (
                <table className="mx-2">
                    <tr>
                        <td className="font-bold">Detail Barang</td>
                    </tr>
                    <tr>
                        <td>Barang</td>
                        <td>:</td>
                        <td>{ lending.stuff.name }</td>
                    </tr>
                    <tr>
                        <td>Tanggal</td>
                        <td>:</td>
                        <td>{ lending.date_time }</td>
                    </tr>
                    <tr>
                        <td>Total barang yang ingin dipinjam</td>
                        <td>:</td>
                        <td>{ lending.total_stuff }</td>
                    </tr>
                </table>
            ) : ''}

                    <form onSubmit={handleReturnLend} class="max-w-sm mx-auto">
                        <div class="mb-5">  
                            <label for="date_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal kembali</label>
                            <input type="datetime-local" id="date_time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik Tanggal Kembali" required  onChange={e => setForms({...forms, date_time: e.target.value})} />
                        </div>
                        <div class="mb-5">
                            <label for="total_good_stuff" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total barang bagus</label>
                            <input type="number" id="total_good_stuff" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik Email" required  onChange={e => setForms({...forms, total_good_stuff: e.target.value})} />
                        </div>
                        <div class="mb-5">
                            <label for="total_defec_stuff" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total barang jelek</label>
                            <input type="number" id="total_defec_stuff" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik barang jelek" required  onChange={e => setForms({...forms, total_defec_stuff: e.target.value})} />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                </div>
    )
}