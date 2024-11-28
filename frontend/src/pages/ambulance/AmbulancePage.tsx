import './app.css'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'

const hospitals = [
    {name: 'Hospital A' , coordinates: [20.352160439770778, 85.81332218132738]},
    {name: 'Hospital B' , coordinates: [20.322779700801682, 85.80049216968614]}
]


const AmbulancePage = () => {
    const mapRef = useRef<mapboxgl.Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);


    useEffect(() => {
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords
                        setUserLocation([longitude, latitude])
                    },
                    (error) => {
                        console.log("Error getting user location", error)
                        setUserLocation([20.35, 85.51])
                    }
                )
            } else {
                console.log("Geolocation not supported")
                setUserLocation([20.35, 85.51])
            }
        }

        getUserLocation()

        mapboxgl.accessToken = "pk.eyJ1IjoiYW5rdXJib3JhaCIsImEiOiJjbTNiaDRveXUwY2YyMmtzNnB6N2hoaDBqIn0.XkvR9BjDgO3Oay1N8H79XA"
        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: userLocation || [20.35, 85],
                zoom: 16
            })

            mapRef.current.on("load", () => {
                if (userLocation) {
                    new mapboxgl.Marker({
                        color: 'red',
                    }).setLngLat(userLocation).addTo(mapRef.current!)
                    hospitals.forEach(hospital => {
                        new mapboxgl.Marker({ color: 'red'})
                        .setLngLat(hospital.coordinates as [number,number])
                        .setPopup(new mapboxgl.Popup().setText(hospital.name))
                        .addTo(mapRef.current!)
                    })
                }
            })
        }
        return () => {
            mapRef.current?.remove()
            mapRef.current = null
        }
    }, [userLocation])
    return (
        <main className="bg-customGreen overflow-hidden">
            <div >
                {/* MAP */}
                <div id='map-container' ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}>
                </div>
                {/** Selector*/}
                <div className=''>
                </div>
            </div>
        </main>
    )
}

export default AmbulancePage
