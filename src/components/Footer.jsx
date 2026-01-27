import React from 'react'
import { Code2 } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className='py-12 px-6 border-t border-white/5'
        >
            <div className='max-w-7xl mx-auto flex flex-col items-center gap-4'>
                <div className='flex items-center gap-2 text-gray-500'>
                    <Code2 size={18} className='text-[#00ff88]' />
                    <span>Built by</span>
                    <a
                        href="https://ajaykeshri.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-white hover:text-[#00ff88] transition-colors font-medium'
                    >
                        Ajay Keshri
                    </a>
                </div>
            </div>
        </motion.footer>
    )
}

export default Footer
