export default function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-light mb-4">URMAH</h4>
            <p className="text-gray-500 text-sm font-light">Premium global events platform.</p>
          </div>
          <div>
            <h4 className="text-white font-light mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500 font-light">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-light mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500 font-light">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-light mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500 font-light">
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8">
          <p className="text-center text-gray-500 text-sm font-light">
            © 2026 URMAH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
