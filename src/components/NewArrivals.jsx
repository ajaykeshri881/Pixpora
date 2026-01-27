import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCuratedPhotos } from '../api/mediaApi'
import { Heart, Download, ExternalLink, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { addToCollection, removeFromCollection } from '../redux/features/CollectionSlice'
import { setQuery, setActiveTabs } from '../redux/features/searchSlice'
import PhotoModal from './PhotoModal'

const NewArrivals = () => {
    const [photos, setPhotos] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const carouselRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { items } = useSelector((store) => store.collection)

    useEffect(() => {
        const loadNewArrivals = async () => {
            try {
                // Fetch page 2 to get different photos than trending
                const data = await fetchCuratedPhotos(2, 12)
                const formattedPhotos = data.map((item) => ({
                    id: item.id,
                    type: 'photo',
                    title: item.alt_description || item.description || 'Photo',
                    thumbnail: item.urls.regular, // High Quality for Carousel
                    src: item.urls.full, // Full HD for modal
                    url: item.links.html,
                    photographer: item.user?.name
                }))
                setPhotos(formattedPhotos)
            } catch (error) {
                console.error('Error loading new arrivals:', error)
            } finally {
                setLoading(false)
            }
        }
        loadNewArrivals()
    }, [])

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 300
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    const isSaved = (id) => items.some(i => i.id === id)

    const handleSave = (e, photo) => {
        e.stopPropagation()
        if (isSaved(photo.id)) {
            dispatch(removeFromCollection(photo.id))
            toast.info('Removed from favorites')
        } else {
            dispatch(addToCollection(photo))
            toast.success('Added to favorites!')
        }
    }

    const openModal = (photo) => {
        setSelectedPhoto(photo)
        setModalOpen(true)
    }

    if (loading) {
        return (
            <section className='py-12 sm:py-16 px-4 sm:px-6 bg-[#0a0a0a]'>
                <div className='max-w-7xl mx-auto'>
                    <div className='flex gap-4 overflow-hidden'>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className='flex-shrink-0 w-60 sm:w-72 aspect-[3/4] rounded-2xl shimmer'></div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className='py-12 sm:py-16 px-4 sm:px-6 bg-[#0a0a0a]'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-12'
                >
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center'>
                            <Clock className='text-[#00d4ff]' size={22} />
                        </div>
                        <div>
                            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white'>
                                New <span className='text-[#00d4ff]'>Arrivals</span>
                            </h2>
                            <p className='text-gray-500 text-sm sm:text-base'>Fresh content added recently</p>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            dispatch(setQuery('new arrivals'))
                            dispatch(setActiveTabs('photos'))
                        }}
                        className='flex items-center gap-2 text-[#00d4ff] hover:underline text-sm sm:text-base'
                    >
                        View all
                        <ArrowRight size={18} />
                    </motion.button>
                </motion.div>

                {/* Carousel Container */}
                <div className='relative group'>
                    {/* Left Arrow */}
                    <button
                        onClick={() => scroll('left')}
                        className='absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2 hidden sm:flex items-center justify-center'
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scroll('right')}
                        className='absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity translate-x-1/2 hidden sm:flex items-center justify-center'
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Carousel */}
                    <div
                        ref={carouselRef}
                        className='flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4'
                    >
                        {photos.map((photo, idx) => (
                            <motion.div
                                key={photo.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => openModal(photo)}
                                className='flex-shrink-0 w-60 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer card-glow relative group/card'
                            >
                                <img
                                    src={photo.thumbnail}
                                    alt={photo.title}
                                    className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110'
                                    loading="lazy"
                                />

                                <div className='absolute top-3 left-3 px-2.5 py-1 bg-[#00d4ff] text-black text-xs font-semibold rounded-lg z-10'>
                                    NEW
                                </div>

                                {/* Simple gradient overlay for text readability */}
                                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none'>
                                    <div className='absolute bottom-0 left-0 right-0 p-4'>
                                        <p className='text-white text-sm truncate'>
                                            {photo.photographer && `by ${photo.photographer}`}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <PhotoModal
                photo={selectedPhoto}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </section>
    )
}

export default NewArrivals
