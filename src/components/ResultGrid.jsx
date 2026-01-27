import { useEffect, useState } from 'react'
import { fetchPhoto, fetchVideo } from '../api/mediaApi'
import { setLoading, setError, setResults, appendResults, incrementPage, setHasMore, setActiveTabs } from '../redux/features/searchSlice'
import { useSelector, useDispatch } from 'react-redux'
import ResultCard from './ResultCard'
import { Loader2, AlertCircle, Search } from 'lucide-react'
import MediaModal from './MediaModal'
import { motion, AnimatePresence } from 'framer-motion'

const ResultGrid = () => {
  const dispatch = useDispatch()
  const { query, activeTab, results, loading, error, page, hasMore } = useSelector((store) => store.search)
  const [loadingMore, setLoadingMore] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleCardClick = (item) => {
    setSelectedMedia(item)
    setModalOpen(true)
  }

  useEffect(() => {
    if (activeTab === 'gif') {
      dispatch(setActiveTabs('photos'))
    }
  }, [activeTab, dispatch])

  useEffect(function () {
    const getData = async () => {
      if (!query) return
      try {
        dispatch(setLoading())
        let data = []

        if (activeTab == 'photos') {
          let response = await fetchPhoto(query, 1)
          data = response.results.map((item) => ({
            id: item.id,
            type: 'photo',
            title: item.alt_description || item.description || 'Photo',
            thumbnail: item.urls.small, // Optimized for grid
            src: item.urls.regular, // Better quality for display
            downloadUrl: item.urls.full, // Full quality for download
            url: item.links.html,
            photographer: item.user?.name
          }))
          dispatch(setHasMore(response.total_pages > 1))
        }
        if (activeTab == 'videos') {
          let response = await fetchVideo(query, 1)
          data = response.videos.map((item) => ({
            id: item.id,
            type: 'video',
            title: item.user?.name || 'Video',
            thumbnail: `${item.image}?auto=compress&cs=tinysrgb&w=600`, // Optimized thumbnail
            src: item.video_files?.find(v => v.quality === 'hd')?.link || item.video_files[0]?.link, // Prefer HD for speed
            url: item.url,
            photographer: item.user?.name
          }))
          dispatch(setHasMore(response.total_results > 20))
        }

        dispatch(setResults(data))
      } catch (err) {
        dispatch(setError(err.message))
      }
    }
    getData()
  }, [query, activeTab])

  const loadMore = async () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)

    try {
      const nextPage = page + 1
      let data = []

      if (activeTab == 'photos') {
        let response = await fetchPhoto(query, nextPage)
        data = response.results.map((item) => ({
          id: item.id,
          type: 'photo',
          title: item.alt_description || item.description || 'Photo',
          thumbnail: item.urls.small, // Optimized for grid
          src: item.urls.regular, // Faster loading
          downloadUrl: item.urls.full, // Full quality for download
          url: item.links.html,
          photographer: item.user?.name
        }))
        if (response.results.length === 0 || nextPage >= response.total_pages) {
          dispatch(setHasMore(false))
        }
      }
      if (activeTab == 'videos') {
        let response = await fetchVideo(query, nextPage)
        data = response.videos.map((item) => ({
          id: item.id,
          type: 'video',
          title: item.user?.name || 'Video',
          thumbnail: `${item.image}?auto=compress&cs=tinysrgb&w=600`, // Optimized thumbnail
          src: item.video_files?.find(v => v.quality === 'hd')?.link || item.video_files[0]?.link,
          url: item.url,
          photographer: item.user?.name
        }))
        if (response.videos.length === 0) {
          dispatch(setHasMore(false))
        }
      }


      dispatch(appendResults(data))
      dispatch(incrementPage())
    } catch (err) {
      console.error('Load more error:', err)
    } finally {
      setLoadingMore(false)
    }
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center py-24 text-gray-400'>
        <div className='w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4'>
          <AlertCircle size={32} className='text-red-400' />
        </div>
        <p className='text-lg font-medium text-white'>Something went wrong</p>
        <p className='text-sm text-gray-500'>{error}</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center py-24'>
        <div className='w-16 h-16 rounded-2xl bg-[#00ff88]/10 flex items-center justify-center mb-4'>
          <Loader2 size={32} className='animate-spin text-[#00ff88]' />
        </div>
        <p className='text-gray-400'>Loading amazing content...</p>
      </div>
    )
  }

  if (!query) {
    return (
      <div className='flex flex-col items-center justify-center py-24 text-gray-400'>
        <div className='w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4'>
          <Search size={32} />
        </div>
        <p className='text-lg font-medium text-white'>Start exploring</p>
        <p className='text-sm text-gray-500'>Search for photos or videos</p>
      </div>
    )
  }

  if (results.length === 0) {
    const contentType = activeTab === 'videos' ? 'videos' : 'photos'
    return (
      <div className='flex flex-col items-center justify-center py-24 text-gray-400'>
        <div className='w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4'>
          <Search size={32} />
        </div>
        <p className='text-lg font-medium text-white'>No {contentType} found</p>
        <p className='text-sm text-gray-500'>We couldn't find any {contentType} for "{query}"</p>
      </div>
    )
  }

  return (
    <div className='px-6 pb-12'>
      {/* Responsive Grid */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        <AnimatePresence>
          {results.map((item, idx) => (
            <motion.div
              key={`${item.id}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
            >
              <ResultCard item={item} onClick={() => handleCardClick(item)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More */}
      {hasMore && results.length > 0 && (
        <div className='flex justify-center mt-12'>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={loadMore}
            disabled={loadingMore}
            className='px-8 py-3.5 bg-[#00ff88] hover:bg-[#00e67a] text-black font-semibold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50'
          >
            {loadingMore ? (
              <>
                <Loader2 size={20} className='animate-spin' />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </motion.button>
        </div>
      )}

      {/* Media Modal */}
      <MediaModal
        item={selectedMedia}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}

export default ResultGrid