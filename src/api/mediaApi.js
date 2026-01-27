import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY


export async function fetchPhoto(query, page = 1, per_page = 20) {
    const res = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query, page, per_page },
        headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
    })
    return res.data
}

export async function fetchVideo(query, page = 1, per_page = 20) {
    const res = await axios.get('https://api.pexels.com/videos/search', {
        params: { query, per_page, page },
        headers: { Authorization: PEXELS_KEY }
    })
    return res.data
}



// Fetch curated/trending content for homepage
export async function fetchCuratedPhotos(page = 1, per_page = 20) {
    const res = await axios.get('https://api.unsplash.com/photos', {
        params: { page, per_page, order_by: 'popular' },
        headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
    })
    return res.data
}

export async function fetchCuratedVideos(page = 1, per_page = 15) {
    const res = await axios.get('https://api.pexels.com/videos/popular', {
        params: { per_page, page },
        headers: { Authorization: PEXELS_KEY }
    })
    return res.data
}



// Fetch nature photos for New Arrivals section
export async function fetchNaturePhotos(page = 1, per_page = 10) {
    const res = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query: 'nature landscape', page, per_page, orientation: 'portrait' },
        headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
    })
    return res.data.results
}

// Fetch adventure videos for homepage carousel
export async function fetchMountainVideos(page = 1, per_page = 10) {
    const res = await axios.get('https://api.pexels.com/videos/search', {
        params: { query: 'adventure travel extreme', per_page, page },
        headers: { Authorization: PEXELS_KEY }
    })
    return res.data.videos
}