import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCollection } from '../redux/features/CollectionSlice'
import ResultCard from '../components/ResultCard'
import MediaModal from '../components/MediaModal'
import { toast } from 'react-toastify'
import { Trash2, Heart, Search } from 'lucide-react'
import { motion } from 'framer-motion'

const CollectionPage = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((store) => store.collection)
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire collection?')) {
      dispatch(clearCollection())
      toast.info('Collection cleared')
    }
  }

  const handleCardClick = (item) => {
    setSelectedMedia(item)
    setModalOpen(true)
  }

  return (
    <div className='pt-28 pb-20 min-h-screen bg-[#0d0d0d] px-4 sm:px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-2xl bg-[#ff00ea]/10 flex items-center justify-center'>
              <Heart className='text-[#ff00ea] fill-current' size={24} />
            </div>
            <div>
              <h1 className='text-3xl sm:text-4xl font-bold text-white'>My Favorites</h1>
              <p className='text-gray-500 mt-1'>{items.length} items saved</p>
            </div>
          </div>

          {items.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearAll}
              className='flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-5 py-2.5 rounded-xl font-semibold transition-all border border-red-500/20'
            >
              <Trash2 size={20} />
              Clear Collection
            </motion.button>
          )}
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex flex-col items-center justify-center py-24 text-gray-400 text-center'
          >
            <div className='w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6'>
              <Search size={40} />
            </div>
            <p className='text-2xl font-bold text-white mb-2'>Your collection is empty</p>
            <p className='text-gray-500 max-w-xs'>
              Explore amazing photos and videos and save them here for later!
            </p>
          </motion.div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-fr'>
            {items.map((item, idx) => (
              <ResultCard
                key={item.id || idx}
                item={item}
                showDelete={true}
                onClick={() => handleCardClick(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Media Modal */}
      <MediaModal
        item={selectedMedia}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}

export default CollectionPage