import React from 'react';
import "../style/gradient.css";


const About = () => {
  return (
    <div className="leading-normal tracking-normal text-white gradient" style={{ margin: "3%"}}>
      <link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" />
        {/*Replace with your tailwind.css once created*/}
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700" rel="stylesheet" />
        {/* Define your gradient here - use online tools to find a gradient matching your branding*/}
        
      {/* Boutons */}
      <section className="bg-white py-8">
          <div className="container mx-auto flex flex-wrap pt-4 pb-12">
            <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
              Membres du projet
            </h2>
            <div className="w-full mb-4">
              <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
            </div>
            <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
              <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                  <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                    Front-end 
                  </p>
                  <div className="w-full font-bold text-xl text-gray-800 px-6">
                    Yanis Aumasson
                  </div>
                  <p className="text-gray-800 text-base px-6 mb-5">
                  Actuellement en L3 Informatique à Lyon 1, dans ce projet j'ai principalement travaillé sur l'affichage de la carte Leaflet et sur le design du site. J'ai également assisté Thomas lors de certaines de ses tâches.
                  </p>
                </a>
              </div>
              <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                <div className="flex items-center justify-start">
                  <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  <a href="http://yanisaumasson.fr">Website</a>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
              <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                  <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                    Back-end
                  </p>
                  <div className="w-full font-bold text-xl text-gray-800 px-6">
                    Thomas Aubourg
                  </div>
                  <p className="text-gray-800 text-base px-6 mb-5">
                    Etudiant en informatique à l'université Lyon 1. J'ai été principalement en charge de la back-end dur projet, majoritairement sur python mais aussi un peu en React.js.
                  </p>
                </a>
              </div>
              <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                <div className="flex items-center justify-center">
                  <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  <a href="https://github.com/Thomas-aub">GitHub</a>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
              <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                  <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                    Database
                  </p>
                  <div className="w-full font-bold text-xl text-gray-800 px-6">
                    Guillaume Fiquemo
                  </div>
                  <p className="text-gray-800 text-base px-6 mb-5">
                    Etudiant en informatique à l'université Lyon 1. Ma mission principale a été de faire la liaison entre la page web et la base de données avec Node.Js
                  </p>
                </a>
              </div>
              <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                <div className="flex items-center justify-end">
                  <button className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                    <a href="https://www.youtube.com/@TeletubbiesFrancais">Youtube</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
    </div>
  );
};
  
export default About;