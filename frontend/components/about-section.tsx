import { Target, Lightbulb, Globe } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">About IST Lab</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">IST Lab 소개</h3>
              <p className="text-lg mb-4 text-gray-700">
                정보과학기술 연구실(IST Lab)은 2005년 설립되어 20년 가까이 국내외 학계·산업계와 긴밀히 협력하며 
                선도적인 정보과학기술 연구를 수행하고 있습니다.
              </p>
              <p className="mb-6 text-gray-700">
                특히 데이터베이스 기술과 스마트 모빌리티 시스템의 융합 연구를 통해, 효율적이고 지능적인 데이터 관리 시스템을 구축하고, 
                이를 기반으로 실생활 문제 해결형 솔루션을 개발하고 있습니다.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">2005</div>
                  <div className="text-sm text-gray-600">설립년도</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">20년</div>
                  <div className="text-sm text-gray-600">연구 경험</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg border">
              <div className="flex items-center mb-3">
                <Lightbulb className="w-6 h-6 mr-3" />
                <h4 className="text-xl font-bold">연구 철학</h4>
              </div>
              <p>현장 중심의 실용성, 첨단 기술의 혁신성, 그리고 사회적 가치를 세 축으로 연구를 추진하여 
              이론적 깊이와 실제 활용 간 균형을 이루며 학문 발전과 공공·산업의 실질적 문제 해결에 기여합니다.</p>
            </div>
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg border">
              <div className="flex items-center mb-3">
                <Target className="w-6 h-6 mr-3" />
                <h4 className="text-xl font-bold">연구 목표</h4>
              </div>
              <div className="space-y-3 text-sm">
                <p><strong>데이터베이스 분야:</strong> 분산·빅데이터 환경에서의 고성능 데이터 처리, 확장성 확보, 지능형 쿼리 지원 시스템 개발</p>
                <p><strong>모빌리티 분야:</strong> 교통 분석 및 최적 경로 탐색, 자율주행 기반의 교통 솔루션, IoT를 활용한 스마트 교통 시스템 구현</p>
                <p className="text-blue-700 font-medium">두 축의 융합을 통해 지능형 통합 플랫폼 구축 및 새로운 비즈니스 모델 창출을 목표로 합니다.</p>
              </div>
            </div>
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg border">
              <div className="flex items-center mb-3">
                <Globe className="w-6 h-6 mr-3" />
                <h4 className="text-xl font-bold">비전</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-blue-700">"미래 기술을 선도하며, 글로벌 연구역량을 갖춘 융합 연구실"</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>국내외 연구기관 및 산업체와의 글로벌 네트워크 강화</li>
                  <li>첨단 기술의 산업 적용 확대 및 상용화</li>
                  <li>창의적 융합 연구와 학생 역량 강화를 통한 미래 방향 선도</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Research Areas */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">주요 연구 분야</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-10 h-10 bg-blue-700 rounded"></div>
              </div>
              <h4 className="text-xl font-bold mb-3">데이터베이스</h4>
              <p className="text-gray-600 leading-relaxed">
                분산·빅데이터 환경에서의 고성능 데이터 처리 시스템, 
                확장성 있는 데이터베이스 아키텍처, 지능형 쿼리 최적화 및 
                머신러닝 기반 데이터 분석 기술 연구
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-10 h-10 bg-blue-700 rounded-full"></div>
              </div>
              <h4 className="text-xl font-bold mb-3">모빌리티</h4>
              <p className="text-gray-600 leading-relaxed">
                교통 빅데이터 분석 및 최적 경로 탐색 알고리즘, 
                자율주행 기반 교통 솔루션, IoT 센서 네트워크를 활용한 
                스마트 교통 시스템 및 실시간 교통 최적화 기술 연구
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
