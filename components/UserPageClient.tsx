"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TreePine } from 'lucide-react';
import Link from 'next/link';

export default function UserPageClient({ username, initialLinks }) {
  const [links, setLinks] = useState(initialLinks);

  if (!links.length) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">User not found</h1>
        <Link href="/" className="text-green-600 hover:text-green-700 mt-4 block">
          Create your own Linkify page
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="flex items-center justify-center mb-8">
          <TreePine className="h-16 w-16 text-green-600 dark:text-green-400" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-3xl font-bold text-center text-green-800 dark:text-green-200 mb-12">
          @{username}
        </motion.h1>
        <div className="relative">
          <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1 }} className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-green-600 dark:bg-green-400" style={{ top: 0, bottom: 0 }} />
          <div className="space-y-8 relative">
            {links.map((link, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + index * 0.2 }} className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'} relative`}>
                <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5 + index * 0.2, duration: 0.3 }} className={`absolute top-1/2 h-1 bg-green-600 dark:bg-green-400 ${index % 2 === 0 ? 'right-1/2' : 'left-1/2'}`} style={{ width: '20%' }} />
                <a href={link.url} target="_blank" rel="noopener noreferrer" className={`transform transition-transform hover:scale-105 ${index % 2 === 0 ? 'mr-[25%]' : 'ml-[25%]'}`}>
                  <div className="bg-white dark:bg-green-950 rounded-lg shadow-lg p-4 w-48">
                    <h2 className="text-lg font-semibold text-green-700 dark:text-green-300">{link.platform}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{link.url}</p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-center mt-12">
          <Link href="/" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
            Create your own Linkify page
          </Link>
        </motion.div>
      </div>
    </div>
  );
}