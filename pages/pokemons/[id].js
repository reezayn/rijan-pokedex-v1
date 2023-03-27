import Layout from '@/components/Layout'
import OtherLinks from '@/components/OtherLinks'
import Image from 'next/image'
import React from 'react'

const Details = ({ pokemon }) => {
  const type = pokemon.type[0]
  const type2 = pokemon?.type[1]
  const emoji = {
    normal: '💎',
    fire: '🔥',
    water: '💧',
    electric: '⚡️',
    grass: '🌿',
    ice: '❄️',
    fighting: '💪',
    poison: '☠️',
    ground: '🌏',
    flying: '🚀',
    psychic: '🔮',
    bug: '🪲',
    rock: '🪨',
    ghost: '👻',
    dragon: '🐉',
    dark: '🖤',
    steel: '🔗',
    fairy: '🦄',
  }

  return (
    <>
      <OtherLinks />
      <Layout title={pokemon.name.english} type={type}>
        <div className="min-h-screen flex flex-col items-center justify-center lg:flex-row w-full">
          <div className="relative flex w-full lg:w-[40%] justify-center z-10 pl-10 ">
            <div className="absolute text-[123px] mt-16 xl:mt-0 xl:text-[234px] z-10 text-gray-600 text-opacity-20 leading-none font-black">
              #{pokemon.id}
            </div>
            <Image
              className="z-20 h-60 w-60 sm:h-80 sm:w-80 mt-56 hover:scale-125 duration-500"
              src={pokemon.image.hires}
              alt={pokemon.name.english}
              width={1000}
              height={1000}
            />
          </div>
          <div className="w-full lg:w-1/2 mt-0 md:mt-5">
            <div id="nameAndHeightWeight" className="flex flex-col">
              <div className="flex flex-row">
                <div className="text-5xl sm:text-7xl md:text-9xl mx-2 flex items-center justify-center">{emoji[type.toLowerCase()]}</div>
                <div className="flex flex-col mx-3">
                  <h5 className="text-base font-bold text-gray-200">
                    {type.toUpperCase()} {' | '} {type2?.toUpperCase()}
                  </h5>
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-100 ">
                    {pokemon.name.english}
                  </h1>
                  <h1 className="text-4xl font-extrabold text-gray-100">
                    {pokemon.name.japanese}
                  </h1>
                </div>
              </div>
              <div className="px-6 mt-3 text-gray-200">
                {pokemon.description}
              </div>
              <div className="px-6 text-gray-100 flex flex-row">
                <div className="w-1/2">
                  <p className="font-bold mr-1 text-lg">Species </p>
                  <p className="font-bold mr-1 text-lg">Height </p>
                  <p className="font-bold mr-1 text-lg">Weight </p>
                  <p className="font-bold mr-1 text-lg">Ability </p>
                </div>
                <div className="w-1/2">
                  <p className="text-lg text-right">{pokemon.species}</p>
                  <p className="text-lg text-right">{pokemon.profile.height}</p>
                  <p className="text-lg text-right">{pokemon.profile.weight}</p>
                  <p className="text-lg text-right">
                    {pokemon.profile.ability[0][0]}
                  </p>
                </div>
              </div>
            </div>
            <div
              id="Stats"
              className={
                'base' in pokemon === false
                  ? 'hidden'
                  : 'flex flex-col md:flex-row text-white font-bold'
              }
            >
              <div className="w-1/4 flex md:justify-center md:items-center font-bold text-4xl text-gray-100 mx-5 md:mx-0 my-5">
                Stats
              </div>
              <div className="w-full md:w-3/4 flex flex-col px-10 md:px-0 pb-14 md:pb-0">
                {'base' in pokemon === false
                  ? console.log('no base or stat')
                  : Object.keys(pokemon.base).map((stat, index) => {
                      let statPercentFactor = 0
                      let statColor
                      switch (stat) {
                        case 'HP':
                          statPercentFactor = 2.55
                          statColor = '#da4343'
                          break
                        case 'Attack':
                          statPercentFactor = 1.81
                          statColor = '#f38d45'
                          break
                        case 'Defense':
                          statPercentFactor = 2.3
                          statColor = '#f3d14a'
                          break
                        case 'Sp. Attack':
                          statPercentFactor = 1.73
                          statColor = '#547fe4'
                          break
                        case 'Sp. Defense':
                          statPercentFactor = 2.3
                          statColor = '#84df57'
                          break
                        case 'Speed':
                          statPercentFactor = 2.0
                          statColor = '#f75887'
                          break
                      }
                      return (
                        <div key={index} className="w-full px-1 lg:px-6 flex flex-col">
                          <div className="flex justify-between">
                            <span>{stat.toUpperCase()}</span>
                            <span>{pokemon.base[stat]}</span>
                          </div>

                          <div className="w-full h-8 rounded-lg bg-transparent flex">
                            <div
                              className="h-8 rounded-lg"
                              style={{
                                backgroundColor: statColor,
                                width:
                                  parseInt(pokemon.base[stat]) *
                                  statPercentFactor,
                              }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = async ({ query }) => {
  try {
    const res = await fetch(`https://api.pikaserve.xyz/pokemon/${query.id}`)
    const data = await res.json()
    return {
      props: {
        query,
        pokemon: data,
      },
    }
  } catch (error) {
    console.log(error)
  }
}

export default Details
