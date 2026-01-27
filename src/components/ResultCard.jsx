import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCollection, removeFromCollection } from '../redux/features/CollectionSlice'
import { toast } from 'react-toastify'
import { Heart, Download, ExternalLink, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

const ResultCard = ({ item, showDelete = false, onClick }) => {
  const dispatch = useDispatch()
  const { items } = useSelector((store) => store.collection)
  const isSaved = items.some(i => i.id === item.id)
  const [imageLoaded, setImageLoaded] = React.useState(false)

  // Reset loading state when item changes
  React.useEffect(() => {
    setImageLoaded(false)
  }, [item.id])

  const handleSave = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (isSaved) {
      dispatch(removeFromCollection(item.id))
      toast.info('Removed from favorites')
    } else {
      dispatch(addToCollection(item))
      toast.success('Added to favorites!')
    }
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(removeFromCollection(item.id))
    toast.info('Removed from favorites')
  }

  const handleDownload = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    try {
      const response = await fetch(item.src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const ext = item.type === 'video' ? 'mp4' : 'jpg'
      link.download = `pixpora-${item.id}.${ext}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success('Download started!')
    } catch (error) {
      toast.error('Download failed')
    }
  }

  const handleOpenSource = (e) => {
    e.stopPropagation()
    e.preventDefault()
    window.open(item.url, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className='relative rounded-2xl overflow-hidden group bg-[#111] card-glow cursor-pointer h-full'
      style={{ breakInside: 'avoid' }}
      onClick={onClick}
    >
      <div
        className='block relative w-full aspect-[3/4]'
      >
        {/* Loading Shimmer */}
        {!imageLoaded && (
          <div className='absolute inset-0 bg-[#1a1a1a] shimmer z-10' />
        )}

        {/* Media - Unified Image Tag for consistent sizing and no-autoplay */}
        <img
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          src={item.thumbnail || item.src}
          alt={item.title || 'Media'}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Simple gradient overlay for photographer name */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none'>
          <div className='absolute bottom-0 left-0 right-0 p-3'>
            <p className='text-white text-xs truncate'>
              {item.photographer && `by ${item.photographer}`}
            </p>
          </div>
        </div>

        {/* Quick Action Icons - Only on favorites page */}
        {showDelete && (
          <div className='absolute top-2 left-2 flex gap-1.5'>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className='p-1.5 rounded-lg bg-red-500/80 text-white shadow-lg'
              title="Remove"
            >
              <Trash2 size={14} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleDownload}
              className='p-1.5 rounded-lg bg-[#00ff88]/80 text-black shadow-lg'
              title="Download"
            >
              <Download size={14} />
            </motion.button>
          </div>
        )}

        {/* Video Play Icon */}
        {item.type === 'video' && (
          <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            <div className='w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ResultCard
