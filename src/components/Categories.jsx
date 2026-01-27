import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setQuery } from '../redux/features/searchSlice'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const categories = [
    {
        name: 'Nature',
        query: 'nature',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
        accent: '#00ff88'
    },
    {
        name: 'Technology',
        query: 'technology future',
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop',
        accent: '#00d4ff'
    },
    {
        name: 'Architecture',
        query: 'modern architecture',
        image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600&h=400&fit=crop',
        accent: '#ff00ea'
    },
    {
        name: 'People',
        query: 'people lifestyle',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=400&fit=crop',
        accent: '#ffd700'
    },
    {
        name: 'Animals',
        query: 'wildlife animals',
        image: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&h=400&fit=crop',
        accent: '#ff6b6b'
    },
    {
        name: 'Abstract',
        query: 'abstract art',
        image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop',
        accent: '#9b59b6'
    }
]

const Categories = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCategoryClick = (query) => {
        dispatch(setQuery(query))
        navigate('/explore')
    }

    return (
        <section className='py-12 sm:py-16 lg:py-24 px-4 sm:px-6'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-12'
                >
                    <div>
                        <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3'>
                            Browse by <span className='gradient-text'>category</span>
                        </h2>
                        <p className='text-gray-500 text-base sm:text-lg'>Curated collections for every project</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/explore')}
                        className='flex items-center gap-2 text-[#00ff88] hover:underline text-sm sm:text-base'
                    >
                        View all
                        <ArrowUpRight size={18} />
                    </motion.button>
                </motion.div>

                {/* Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                    {categories.map((category, idx) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => handleCategoryClick(category.query)}
                            className='group relative h-48 sm:h-56 lg:h-72 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer card-glow'
                        >
                            {/* Background Image */}
                            <img
                                src={category.image}
                                alt={category.name}
                                className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                                loading="lazy"
                            />

                           
                            <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent'></div>

                           
                            <div
                                className='absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500'
                                style={{ background: category.accent }}
                            ></div>

                            {/*Content*/}
                            <div className='absolute bottom-0 left-0 right-0 p-4 sm:p-6'>
                                <div className='flex items-center justify-between'>
                                    <h3 className='text-xl sm:text-2xl font-bold text-white'>{category.name}</h3>
                                    <div
                                        className='w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0'
                                        style={{ background: category.accent }}
                                    >
                                        <ArrowUpRight className='text-black' size={18} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories
