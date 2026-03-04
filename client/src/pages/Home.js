import React, { useEffect, useState } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';
import Navbar from '../components/Navbar.js'
const Home = ({ isLoggedIn, onLogout, location, setLocation }) => {
    const [places, setPlaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [visiblePlaces, setVisiblePlaces] = useState([]);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const calculatePageSize = () => {
            const rowHeight = 80;
            const headerHeight = 250;
            const availableHeight = window.innerHeight - headerHeight;
            const rows = Math.floor(availableHeight / rowHeight);
            setPageSize(Math.max(rows, 1));
        };

        calculatePageSize();
        window.addEventListener('resize', calculatePageSize);
        return () => window.removeEventListener('resize', calculatePageSize);
    }, []);

    useEffect(() => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        setVisiblePlaces(places.slice(start, end));
    }, [places, currentPage, pageSize]);

    const totalPages = Math.ceil(places.length / pageSize);

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address) => {
        console.log(address);
        setValue(address, false);
        clearSuggestions();
    };

    const handleSubmit = async (value) => {
        const results = await getGeocode({ address: value });
        const { lat, lng } = await getLatLng(results[0]);
        const latLng = { lat: lat, lng: lng }
        setLocation(latLng);
        const res = await fetch('/places/getList', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(latLng), });
        console.log(res);
        const data = await res.json();
        setStarted(true);
        setPlaces(data);
        console.log(data);
        setCurrentPage(1);
    }

    return (
        <div class="h-screen bg-pink-100">
            {/*<Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />*/}
            {/*added pt-8 to veggie finder title, removed navbar*/}
            <h2 class="flex items-center justify-center text-4xl font-extrabold pt-8">veggie finder</h2>
            <div class="flex justify-center p-4">
                <ul class="flex space-x-0">
                    <li>
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            disabled={!ready}
                            placeholder="enter your location"
                            class="border p-2 rounded focus:outline-none focus:border-pink-500"
                        />
                    </li>
                    <li><button class="bg-pink-300 rounded p-2" onClick={() => handleSubmit(value)}>search</button></li>
                </ul>

            </div>
            {status === 'OK' && (
                <ul class="absolute left-1/2 transform -translate-x-1/2 mt-1 rounded-md z-10 p-2 max-w-[90vw] w-max text-center">
                    {data.map(({ place_id, description }) => (
                        <li class="border border-pink-500 bg-pink-200 p-1 rounded" key={place_id} onClick={() => handleSelect(description)}>
                            {description}
                        </li>
                    ))}
                </ul>
            )}

            <div className="p-4 w-full sm:w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto">

                <ul className="divide-y divide-gray-200 border rounded-lg shadow overflow-hidden">
                    {visiblePlaces.map((place) => (
                        <li
                            key={place.id}
                            className="p-4 flex flex-col justify-center h-20 sm:h-20 hover:bg-white transition"
                        >
                            <span className="font-medium text-base truncate sm:whitespace-normal">
                                {place.displayName?.text || '(no name)'}
                            </span>
                            <span className="text-sm text-gray-500 truncate sm:whitespace-normal">
                                {place.formattedAddress || '(no address)'}
                            </span>
                        </li>
                    ))}
                </ul>

                {started && <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span className="text-sm sm:text-base">
                        Page {currentPage} of {totalPages || 1}
                    </span>
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        Next
                    </button>
                </div>}
            </div>
        </div>
    );
};

export default Home;