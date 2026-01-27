import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setQuery, setActiveTabs } from '../redux/features/searchSlice'
import { X } from 'lucide-react'
import Hero from '../components/Hero'
import TrendingPhotos from '../components/TrendingPhotos'
import NewArrivals from '../components/NewArrivals'
import MountainVideos from '../components/MountainVideos'
import Footer from '../components/Footer'
import ResultGrid from '../components/ResultGrid'

const HomePage = () => {
    const { query, activeTab } = useSelector((store) => store.search)
    const dispatch = useDispatch()
    const resultsRef = useRef(null)

    // Auto-scroll to results when query changes
    useEffect(() => {
        if (query && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [query])

    return (
        <div className='pt-16 sm:pt-20 overflow-x-hidden bg-[#0d0d0d]'>
            <Hero />
            {query ? (
                <div ref={resultsRef} className='animate-fade-in scroll-mt-24'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex items-center justify-between gap-4'>
                        <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white truncate'>
                            Results for <span className='text-[#00ff88]'>"{query}"</span>
                        </h2>
                        <button
                            onClick={() => dispatch(setQuery(''))}
                            className='p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 active:scale-95 flex-shrink-0'
                            title="Clear search and return home"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content Type Tabs */}
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 mb-6 flex gap-3'>
                        {['photos', 'videos'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => dispatch(setActiveTabs(tab))}
                                className={`px-6 py-2.5 rounded-full font-medium capitalize transition-all ${activeTab === tab
                                    ? 'bg-[#00ff88] text-black shadow-lg shadow-[#00ff88]/20'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <ResultGrid />
                </div>
            ) : (
                <>
                    <TrendingPhotos />
                    <NewArrivals />
                    <MountainVideos />
                </>
            )}
            <Footer />
        </div>
    )
}

export default HomePage
