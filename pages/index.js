import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [file, setFile] = useState()
  const [prediction, setPrediction] = useState({})
  const ref = useRef(null)
  const router = useRouter()

  const handlePrediction = async () => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()

      if (data.error) {
        console.log(data.error)
      }

      setPrediction({ data })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  useEffect(() => {
    if (file) {
      handlePrediction()
        .then(() => {
          if (prediction && prediction.data) {
            router.push({
              pathname: '/pokemon',
              query: { numberPokemon: `${prediction.data.class_index}`, namePokemon: `${prediction.data.class_label}` }
            })
          } else {
            console.log('erro')
          }
        })
        .catch(error => {
          console.error('Error:', error)
        })
    }
  }, [file, prediction])

  return (
    <main className={styles.main}>
      <div className={styles.containerInput}>
        <label className={styles.button} htmlFor='arquivo' onClick={() => {
          ref.current.click()
        }}>
          <Image
            width={80}
            height={80}
            alt='a'
            src='/Vector.svg'
          />
        </label>
        <input className={styles.input} type="file" name='arquivo' ref={ref} onChange={handleFileChange} accept="image/*" />
        <h3>Coloque a foto do seu novo Pokemon</h3>
      </div>
    </main>
  )
}

