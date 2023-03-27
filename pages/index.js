import Layout from '@/components/Layout'
import Navbar from '@/components/Navbar'
import OtherLinks from '@/components/OtherLinks'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs'

export default function Home({ pokeData, styles }) {
  const [searchResults, setSearchResults] = useState(pokeData)
  const [pokeArr, setPokeArr] = useState(searchResults.slice(0, 3))
  const [pageNo, setPageNo] = useState(0)
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    setPokeArr(searchResults.slice(pageNo * 3, pageNo * 3 + 3))
  }, [pageNo])

  useEffect(()=>{
    setPokeArr(searchResults.slice(0, 3))
  },[searchResults])
  useEffect(()=>{
    if(input.length===0 && filter === "All"){
      setSearchResults(pokeData)
      return
    }
    if(input.length!==0 && filter === "All"){
      setSearchResults(c=>(c=pokeData.filter((pokemon)=>{
        return pokemon.name.english.toLowerCase().includes(input.toLowerCase())
      })))
      return
    }
    if(input.length===0 && filter !== "All"){
      setSearchResults(c=>(c=pokeData.filter((pokemon)=>{
        return pokemon.type.includes(filter)
      })))
      return
    }
    if(input.length!==0 && filter !== "All"){
      setSearchResults(c=>(c=pokeData.filter((pokemon)=>{
        return pokemon.type.includes(filter) && pokemon.name.english.toLowerCase().includes(input.toLowerCase())
      })))
      return
    }
  },[input,filter])

  const handlePrev=()=>{
    setPageNo(c=>{return c-1})
  }
  const handleNext=()=>{
    setPageNo(c=>{return c+1})
  }
  const handleFilterChange=(e)=>{
    setFilter(e.target.value)
  }
  const handleInputChange=(e)=>{
    setInput(e.target.value)
  }
  return (
    <>
      <Navbar />
      <OtherLinks />
      <div className='flex items-center justify-center min-h-screen w-full'>
      <Layout title={'Pokedex - By Rijan'}>
        <div className="flex justify-center pt-12 items-center">
          <input
            type="text"
            placeholder="Search"
            className="mx-8 w-full sm:w-3/4 bg-gray-100 px-6 py-2 rounded border border-ice outline-none"
            onChange={handleInputChange}
            value={input}
          />
        </div>
        <div className="flex px-8 sm:px-16 py-4 items-center">
          <label
            htmlFor="types"
            className="block mr-6 font-medium text-white text-lg sm:text-2xl"
          >
            Type
          </label>
          <select
            name="types"
            id="types"
            defaultValue={'All'}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 sm:p-2.5 outline-none"
            onChange={handleFilterChange}
            value={filter}
          >
            <option value="All">All</option>
            <option value="Normal">Normal</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Electric">Electric</option>
            <option value="Grass">Grass</option>
            <option value="Ice">Ice</option>
            <option value="Fighting">Fighting</option>
            <option value="Poison">Poison</option>
            <option value="Ground">Ground</option>
            <option value="Flying">Flying</option>
            <option value="Psychic">Psychic</option>
            <option value="Bug">Bug</option>
            <option value="Rock">Rock</option>
            <option value="Ghost">Ghost</option>
            <option value="Dragon">Dragon</option>
            <option value="Dark">Dark</option>
            <option value="Steel">Steel</option>
            <option value="Fairy">Fairy</option>
          </select>
        </div>
        <div className="min-h-scree text-white">
          <div className="flex flex-row flex-wrap justify-center items-center">
            {pokeArr.map((pokemon) => (
              <div key={pokemon.name.english} className="p-4">
                <Link href={`/pokemons/${pokemon.id}`}>
                  <div className="bg-transparent py-4 px-6 rounded w-72">
                    <div className="w-full flex items-center justify-center">
                      <Image
                        src={pokemon.image.hires}
                        alt={pokemon.name}
                        className="h-36 w-36 sm:h-48 sm:w-48"
                        width={123}
                        height={123}
                      />
                    </div>
                    <div>
                      <div className="p-2 flex w-full items-center justify-center">
                        {pokemon.type.map((singleType) => (
                          <div
                            key={singleType}
                            className="text-white text-xs font-semibold mr-2 px-2 py-1 rounded"
                            style={{
                              backgroundColor: styles[singleType.toLowerCase()],
                            }}
                          >
                            {singleType}
                          </div>
                        ))}
                      </div>
                      <div className="w-full flex items-center justify-center text-xl font-bold">
                        #{pokemon.id}
                      </div>
                      <div className="w-full flex items-center justify-center text-3xl font-bold">
                        {pokemon.name.english}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-row w-full justify-center items-center h-32">
            <button
              className="bg-transparent mx-5 rounded-full flex items-center justify-center p-3 text-white"
              onClick={handlePrev}
              disabled={pageNo === 0 ? true : false}
            >
              <BsCaretLeftFill size={80} />
            </button>
            <button
              className="bg-transparent mx-5 rounded-full flex items-center justify-center p-3 text-white"
              onClick={handleNext}
              disabled={searchResults.length / 3 - pageNo < 1 ? true : false}
            >
              <BsCaretRightFill size={80} />
            </button>
          </div>
        </div>
      </Layout>
      </div>
      
    </>
  )
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://api.pikaserve.xyz/pokemon/all')
    const data = await res.json()

    return {
      props: {
        pokeData: data,
        styles: {
          normal: '#A8A77A',
          fire: '#EE8130',
          water: '#6390F0',
          electric: '#F7D02C',
          grass: '#7AC74C',
          ice: '#96D9D6',
          fighting: '#C22E28',
          poison: '#A33EA1',
          ground: '#E2BF65',
          flying: '#A98FF3',
          psychic: '#F95587',
          bug: '#A6B91A',
          rock: '#B6A136',
          ghost: '#735797',
          dragon: '#6F35FC',
          dark: '#705746',
          steel: '#B7B7CE',
          fairy: '#D685AD',
        },
      },
    }
  } catch (error) {
    console.log(error)
  }
}
