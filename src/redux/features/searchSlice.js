import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: '',
        activeTab: 'photos',
        results: [],
        loading: false,
        error: null,
        page: 1,
        hasMore: true
    },
    reducers: {
        setQuery(state, action) {
            state.query = action.payload
            state.page = 1
            state.results = []
            state.hasMore = true
        },
        setActiveTabs(state, action) {
            state.activeTab = action.payload
            state.page = 1
            state.results = []
            state.hasMore = true
        },
        setResults(state, action) {
            state.results = action.payload
            state.loading = false
        },
        appendResults(state, action) {
            state.results = [...state.results, ...action.payload]
            state.loading = false
        },
        setLoading(state, action) {
            state.loading = true
            state.error = null
        },
        setError(state, action) {
            state.error = action.payload
            state.loading = false
        },
        incrementPage(state) {
            state.page += 1
        },
        setHasMore(state, action) {
            state.hasMore = action.payload
        },
        clearResults(state) {
            state.results = []
            state.page = 1
            state.hasMore = true
        }
    }
})

export const {
    setQuery,
    setActiveTabs,
    setError,
    setLoading,
    setResults,
    appendResults,
    incrementPage,
    setHasMore,
    clearResults
} = searchSlice.actions
export default searchSlice.reducer