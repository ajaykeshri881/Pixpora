import { createSlice } from '@reduxjs/toolkit'

// helper to create an optimized thumbnail URL( for fast loading)
const optimizeThumbnail = (url) => {
    if (!url) return url

    // For Unsplash images 
    if (url.includes('images.unsplash.com')) {
        const baseUrl = url.split('?')[0]
        return `${baseUrl}?w=200&q=60`
    }

    // For Pexels images
    if (url.includes('images.pexels.com')) {
        const baseUrl = url.split('?')[0]
        return `${baseUrl}?auto=compress&cs=tinysrgb&w=200`
    }

    return url
}

// Load from localStorage with optimization
const loadFromStorage = () => {
    try {
        const stored = localStorage.getItem('favorites')
        if (!stored) return []

        let items = JSON.parse(stored)

        // Optimize all thumbnails on load
        items = items.map(item => ({
            ...item,
            thumbnail: optimizeThumbnail(item.thumbnail || item.src)
        }))

        // Save the optimized version back
        localStorage.setItem('favorites', JSON.stringify(items))

        return items
    } catch (e) {
        console.error("Could not load favorites", e)
        return []
    }
}

const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
        items: loadFromStorage()
    },
    reducers: {
        addToCollection(state, action) {
            const exists = state.items.find(item => item.id === action.payload.id)
            if (!exists) {
                // Create optimized item before saving
                const optimizedItem = {
                    ...action.payload,
                    thumbnail: optimizeThumbnail(action.payload.thumbnail || action.payload.src)
                }
                state.items.push(optimizedItem)
                localStorage.setItem('favorites', JSON.stringify(state.items))
            }
        },
        removeFromCollection(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload)
            localStorage.setItem('favorites', JSON.stringify(state.items))
        },
        clearCollection(state) {
            state.items = []
            localStorage.removeItem('favorites')
        }
    }
})

export const { addToCollection, removeFromCollection, clearCollection } = collectionSlice.actions
export default collectionSlice.reducer