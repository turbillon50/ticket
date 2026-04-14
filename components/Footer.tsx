'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  const footerLinks = [
    {
      category: 'Company',
      links: ['About', 'Blog', 'Press', 'Careers'],
    },
    {
      category: 'Support',
      links: ['Help Center', 'Contact', 'FAQ', 'Status'],
    },
    {
      category: 'Legal',
      links: ['Privacy', 'Terms', 'Cookies', 'GDPR'],
    },
    {
      category: 'Social',
      links: ['Instagram', 'Twitter', 'Facebook', 'LinkedIn'],
    },
  ]

  return (
    <footer className="bg-dark-surface border-t border-dark-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold font-playfair gradient-text mb-2">
              URMAH
            </h3>
            <p className="text-dark-text-secondary font-light">
              Premium global events platform
            </p>
          </motion.div>

          {/* Links */}
          {footerLinks.map((col, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4">{col.category}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-dark-text-secondary hover:text-accent-amber transition-colors font-light"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="border-t border-dark-border pt-8 text-center"
        >
          <p className="text-dark-text-secondary text-sm font-light">
            © 2026 URMAH. All rights reserved. Made with ✨ for the world's most exclusive experiences.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
