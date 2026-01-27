import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setQuery } from '../redux/features/searchSlice'
import Footer from '../components/Footer'
import {
    Mountain, Cpu, Building2, Users, PawPrint, Palette, Plane, Utensils,
    Trophy, Music, Shirt, Briefcase, HeartPulse, Rocket, Camera, Flower2,
    Car, Gamepad2, Book, Coffee, Gem, Sun, TreePine, Waves, Bird,
    Laptop, Smartphone, Globe, Home, Castle, Church,
    Baby, Heart, PartyPopper, GraduationCap, Dumbbell, Bike,
    Guitar, Mic, Drama, Clapperboard, Pizza, Cake, Wine, Salad
} from 'lucide-react'
import { motion } from 'framer-motion'

//each category has exactly 6 subcategories for consistent grid layout
const categoryGroups = [
    {
        name: 'Nature & Outdoors',
        icon: Mountain,
        accent: '#00ff88',
        subcategories: [
            { name: 'Landscapes', query: 'landscape scenery', icon: Mountain },
            { name: 'Forests', query: 'forest trees', icon: TreePine },
            { name: 'Ocean', query: 'ocean sea waves', icon: Waves },
            { name: 'Wildlife', query: 'wildlife animals', icon: PawPrint },
            { name: 'Flowers', query: 'flowers garden', icon: Flower2 },
            { name: 'Sunset', query: 'sunset sunrise', icon: Sun }
        ]
    },
    {
        name: 'Technology',
        icon: Cpu,
        accent: '#00d4ff',
        subcategories: [
            { name: 'Computers', query: 'computer technology', icon: Laptop },
            { name: 'Smartphones', query: 'smartphone mobile', icon: Smartphone },
            { name: 'Internet', query: 'internet network', icon: Globe },
            { name: 'AI & Future', query: 'artificial intelligence future', icon: Cpu },
            { name: 'Gaming', query: 'gaming esports', icon: Gamepad2 },
            { name: 'Gadgets', query: 'gadgets devices', icon: Camera }
        ]
    },
    {
        name: 'Architecture',
        icon: Building2,
        accent: '#ff00ea',
        subcategories: [
            { name: 'Modern', query: 'modern architecture', icon: Building2 },
            { name: 'Houses', query: 'house interior', icon: Home },
            { name: 'Castles', query: 'castle medieval', icon: Castle },
            { name: 'Churches', query: 'church cathedral', icon: Church },
            { name: 'Skyscrapers', query: 'skyscraper city', icon: Building2 },
            { name: 'Bridges', query: 'bridge structure', icon: Building2 }
        ]
    },
    {
        name: 'People & Lifestyle',
        icon: Users,
        accent: '#ffd700',
        subcategories: [
            { name: 'Portraits', query: 'portrait people', icon: Users },
            { name: 'Family', query: 'family happy', icon: Baby },
            { name: 'Couples', query: 'couple love', icon: Heart },
            { name: 'Party', query: 'party celebration', icon: PartyPopper },
            { name: 'Education', query: 'education school', icon: GraduationCap },
            { name: 'Fashion', query: 'fashion style', icon: Shirt }
        ]
    },
    {
        name: 'Sports & Fitness',
        icon: Trophy,
        accent: '#ff6b6b',
        subcategories: [
            { name: 'Gym', query: 'gym workout', icon: Dumbbell },
            { name: 'Cycling', query: 'cycling bike', icon: Bike },
            { name: 'Running', query: 'running marathon', icon: HeartPulse },
            { name: 'Swimming', query: 'swimming pool', icon: Waves },
            { name: 'Extreme', query: 'extreme sports', icon: Trophy },
            { name: 'Yoga', query: 'yoga meditation', icon: HeartPulse }
        ]
    },
    {
        name: 'Arts & Entertainment',
        icon: Palette,
        accent: '#9b59b6',
        subcategories: [
            { name: 'Abstract', query: 'abstract art', icon: Palette },
            { name: 'Music', query: 'music concert', icon: Guitar },
            { name: 'Singing', query: 'singer performing', icon: Mic },
            { name: 'Theater', query: 'theater drama', icon: Drama },
            { name: 'Cinema', query: 'movie cinema', icon: Clapperboard },
            { name: 'Photography', query: 'photography camera', icon: Camera }
        ]
    },
    {
        name: 'Food & Drinks',
        icon: Utensils,
        accent: '#e74c3c',
        subcategories: [
            { name: 'Fast Food', query: 'pizza burger', icon: Pizza },
            { name: 'Desserts', query: 'cake dessert', icon: Cake },
            { name: 'Drinks', query: 'drinks beverages', icon: Wine },
            { name: 'Healthy', query: 'healthy food salad', icon: Salad },
            { name: 'Coffee', query: 'coffee cafe', icon: Coffee },
            { name: 'Cuisine', query: 'gourmet cuisine', icon: Utensils }
        ]
    },
    {
        name: 'Travel & Places',
        icon: Plane,
        accent: '#3498db',
        subcategories: [
            { name: 'Adventure', query: 'travel adventure', icon: Plane },
            { name: 'Beach', query: 'beach tropical', icon: Sun },
            { name: 'Mountains', query: 'mountain hiking', icon: Mountain },
            { name: 'Cities', query: 'city urban', icon: Building2 },
            { name: 'Cars', query: 'cars automotive', icon: Car },
            { name: 'Luxury', query: 'luxury travel', icon: Gem }
        ]
    }
]

const ExplorePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCategoryClick = (categoryQuery) => {
        dispatch(setQuery(categoryQuery))
        navigate('/')
    }

    return (
        <div className='pt-24 sm:pt-28 min-h-screen bg-[#0d0d0d]'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-4'>
                {categoryGroups.map((group, groupIdx) => {
                    const GroupIcon = group.icon
                    return (
                        <motion.section
                            key={group.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: groupIdx * 0.1 }}
                            className='mb-10 sm:mb-14'
                        >
                            {/* Category Heading */}
                            <div className='flex items-center gap-3 mb-5 sm:mb-6'>
                                <div
                                    className='w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center'
                                    style={{ background: `${group.accent}15` }}
                                >
                                    <GroupIcon size={22} style={{ color: group.accent }} />
                                </div>
                                <h2 className='text-xl sm:text-2xl font-bold text-white'>{group.name}</h2>
                                <div className='flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4'></div>
                            </div>

                            {/* subcategory Cards Grid 6 columns nd 6 items each */}
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4'>
                                {group.subcategories.map((sub, subIdx) => {
                                    const SubIcon = sub.icon
                                    return (
                                        <motion.button
                                            key={sub.name}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: subIdx * 0.03 }}
                                            whileHover={{ scale: 1.03, y: -3 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => handleCategoryClick(sub.query)}
                                            className='group flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl bg-[#1a1a1a] border border-white/5 hover:border-white/10 transition-all'
                                        >
                                            <div
                                                className='w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110'
                                                style={{ background: `${group.accent}15` }}
                                            >
                                                <SubIcon size={24} style={{ color: group.accent }} />
                                            </div>
                                            <span className='text-gray-300 text-sm font-medium text-center group-hover:text-white transition-colors'>{sub.name}</span>
                                        </motion.button>
                                    )
                                })}
                            </div>
                        </motion.section>
                    )
                })}
            </div>

            <Footer />
        </div>
    )
}

export default ExplorePage
