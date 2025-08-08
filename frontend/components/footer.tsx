export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          {/* Lab Info */}
          <div className="mb-6">
            <div className="text-2xl font-bold mb-4">IST Lab</div>
            <div className="text-center text-sm text-blue-300 space-y-2">
              <div>Information Science & Technology Laboratory</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <div className="text-center text-sm text-blue-300 space-y-1">
              <div>전북특별자치도 군산시 대학로 558</div>
              <div>디지털정보관 1층 151-107</div>
              <div>Tel: 063-469-8912</div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-sm text-blue-300">
          <p>
            Copyright © 2025 Information Science & Technology Laboratory, Kunsan National University. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
