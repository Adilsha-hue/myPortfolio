export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-600 text-white font-bold">
              M
            </div>
            <span className="font-medium">Mohammed Adilsha Afsar M</span>
          </div>
          <p className="text-gray-500">© {new Date().getFullYear()} Mohammed Adilsha Afsar M. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

