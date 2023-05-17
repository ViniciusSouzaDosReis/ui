import Image from "next/image";
import styles from './page.module.css'
import { useRouter } from "next/router";


export default function Pokemon() {
  const router = useRouter()
  const pokemonNumber = router.query.numberPokemon
  const pokemonName = router.query.namePokemon

  const URL_IMG = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonNumber}.svg`

  return (
    <main className={styles.main}>
      <div className={styles.pokemonContainer}>
        <button className={styles.buttonBack} onClick={() => router.back()}>Colocar outro Pokemon</button>
        <h1>{pokemonName}</h1>
        <Image
          width={362}
          height={354}
          alt='a'
          src = {URL_IMG}
        />
        <p className={styles.p}>Estou aqui para celebrar e elogiar seu incrível parceiro Pokémon. Seu Pokémon é verdadeiramente magnífico! Com sua beleza única e personalidade encantadora, é impossível não se apaixonar por ele.
        </p>
      </div>
    </main>
  )
}