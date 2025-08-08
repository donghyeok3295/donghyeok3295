import { Award, ExternalLink } from "lucide-react"

export default function ConferencePapersSection() {
  const conferencePapers = [
    {
      id: 1,
      title: "AI 기반 데이터 분석 시스템 개발",
      authors: "박사과정 연구원, 정동원",
      venue: "2024 한국컴퓨터종합학술대회 (KCC 2024)",
      location: "제주국제컨벤션센터",
      date: "2024년 6월 26-28일",
      year: "2024",
      type: "국내학회",
      pages: "pp. 1234-1236",
      abstract: "인공지능 기술을 활용한 데이터 분석 시스템의 설계 및 구현에 대해 발표하였으며, 실시간 데이터 처리 성능이 기존 시스템 대비 50% 향상되었다."
    },
    {
      id: 2,
      title: "Efficient Query Processing in Distributed Big Data Environments",
      authors: "정동원, 박사과정 연구원",
      venue: "IEEE International Conference on Data Engineering (ICDE 2024)",
      location: "Utrecht, Netherlands",
      date: "May 13-17, 2024",
      year: "2024",
      type: "국제학회",
      pages: "pp. 567-578",
      abstract: "분산 빅데이터 환경에서의 효율적인 쿼리 처리 기법을 제안하고, 네트워크 트래픽을 최소화하면서 처리 성능을 향상시키는 방법을 제시하였다."
    },
    {
      id: 3,
      title: "소프트웨어 품질 향상을 위한 새로운 방법론",
      authors: "석사과정 연구원, 정동원",
      venue: "2024 한국소프트웨어공학회 춘계학술대회",
      location: "강원대학교",
      date: "2024년 5월 23-24일",
      year: "2024",
      type: "국내학회",
      pages: "pp. 89-92",
      abstract: "소프트웨어 개발 과정에서 품질을 향상시키기 위한 새로운 방법론을 제안하고, 실제 프로젝트에 적용한 결과를 발표하였다."
    },
    {
      id: 4,
      title: "Machine Learning Approaches for Database Optimization",
      authors: "정동원, 박사과정 연구원, 석사과정 연구원",
      venue: "ACM SIGMOD International Conference on Management of Data",
      location: "Seattle, WA, USA",
      date: "June 18-23, 2023",
      year: "2023",
      type: "국제학회",
      pages: "pp. 1456-1468",
      abstract: "머신러닝 기법을 데이터베이스 최적화에 적용하는 새로운 접근법을 제시하고, 다양한 벤치마크에서 우수한 성능을 입증하였다."
    },
    {
      id: 5,
      title: "IoT 환경에서의 실시간 데이터 처리 시스템",
      authors: "박사과정 연구원, 석사과정 연구원, 정동원",
      venue: "2023 한국정보과학회 가을학술발표회",
      location: "부산 BEXCO",
      date: "2023년 12월 20-22일",
      year: "2023",
      type: "국내학회",
      pages: "pp. 345-347",
      abstract: "IoT 디바이스에서 생성되는 대용량 데이터를 실시간으로 처리하는 시스템을 개발하고, 지연시간을 최소화하는 기법을 제안하였다."
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "국제학회":
        return "bg-green-100 text-green-800"
      case "국내학회":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Conference Papers</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            IST Lab에서 발표한 학회 논문들을 소개합니다.
          </p>
        </div>

        <div className="space-y-8">
          {conferencePapers.map((paper) => (
            <div key={paper.id} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium mr-3 ${getTypeColor(paper.type)}`}>
                    {paper.type}
                  </span>
                  <span className="text-sm text-gray-500">{paper.year}</span>
                </div>
                <Award className="w-6 h-6 text-blue-700" />
              </div>

              <h3 className="text-2xl font-bold text-blue-700 mb-4">{paper.title}</h3>
              
              <div className="space-y-3 mb-6">
                <p className="text-gray-700">
                  <strong>저자:</strong> {paper.authors}
                </p>
                <p className="text-gray-700">
                  <strong>학회:</strong> {paper.venue}
                </p>
                <p className="text-gray-700">
                  <strong>장소:</strong> {paper.location}
                </p>
                <p className="text-gray-700">
                  <strong>일시:</strong> {paper.date}
                </p>
                <p className="text-gray-700">
                  <strong>페이지:</strong> {paper.pages}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">초록</h4>
                <p className="text-gray-600 leading-relaxed">{paper.abstract}</p>
              </div>

              <div className="flex space-x-4">
                <button className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  논문 보기
                </button>
                <button className="flex items-center border border-blue-700 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                  발표자료
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}