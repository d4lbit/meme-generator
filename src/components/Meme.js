import React from "react"

export default function Meme() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        img: "http://i.imgflip.com/3i7p.jpg" 
    })

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    
    function getMemeImg() {
        const randomMeme = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomMeme].url
        setMeme(prevState => ({
            ...prevState,
            img: url
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="forms">
                <input 
                    type="text"
                    placeholder="Top Text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                    />
                        
                    <input 
                    type="text" 
                    placeholder="Bottom Text" 
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                    />
            <button onClick={getMemeImg}>Get a new meme image 🖼️ </button>
            </div>

            <div className="meme-div">
                <img src={meme.img} className="meme-img"/>
                <h2 className="top-text">{meme.topText}</h2>
                <h2 className="bottom-text">{meme.bottomText}</h2>
            </div>
        </main>
    )
}