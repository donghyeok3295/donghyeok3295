import { FileText, ExternalLink } from "lucide-react"

export default function JournalPapersSection() {
  const journalPapers = [
    {
      id: 1,
      title: "정보과학기술 분야의 혁신적 접근법에 관한 연구",
      authors: "정동원, 박사과정 연구원, 석사과정 연구원",
      venue: "한국정보과학회 논문지",
      volume: "Vol. 50, No. 12",
      pages: "pp. 1234-1245",
      year: "2024",
      type: "국내학술지",
      doi: "10.5626/KTCP.2024.50.12.1234",
      abstract: "본 연구는 정보과학기술 분야에서 새로운 혁신적 접근법을 제시하며, 기존 방법론의 한계를 극복하는 새로운 프레임워크를 제안한다."
    },
    {
      id: 2,
      title: "빅데이터 환경에서의 효율적인 질의 처리 기법",
      authors: "정동원, 박사과정 연구원",
      venue: "IEEE Transactions on Knowledge and Data Engineering",
      volume: "Vol. 35, No. 8",
      pages: "pp. 1567-1580",
      year: "2023",
      type: "국제학술지",
      doi: "10.1109/TKDE.2023.1234567",
      abstract: "대용량 데이터 환경에서 질의 처리 성능을 향상시키기 위한 새로운 알고리즘을 제안하고, 실험을 통해 기존 방법 대비 40% 성능 향상을 달성하였다."
    },
    {
      id: 3,
      title: "머신러닝 기반 데이터베이스 최적화 시스템",
      authors: "박사과정 연구원, 정동원",
      venue: "ACM Transactions on Database Systems",
      volume: "Vol. 48, No. 3",
      pages: "pp. 1-28",
      year: "2023",
      type: "국제학술지",
      doi: "10.1145/3589334.3589335",
      abstract: "머신러닝 기법을 활용하여 데이터베이스 쿼리 최적화를 자동화하는 시스템을 개발하였으며, 다양한 워크로드에서 우수한 성능을 보였다."
    },
    {
      id: 4,
      title: "클라우드 환경에서의 분산 데이터 처리 최적화",
      authors: "석사과정 연구원, 정동원",
      venue: "정보처리학회논문지",
      volume: "Vol. 12, No. 4",
      pages: "pp. 156-167",
      year: "2023",
      type: "국내학술지",
      doi: "10.3745/KTSDE.2023.12.4.156",
      abstract: "클라우드 환경에서 분산 데이터 처리의 효율성을 높이기 위한 새로운 스케줄링 알고리즘을 제안하고 검증하였다."
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "국제학술지":
        return "bg-green-100 text-green-800"
      case "국내학술지":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Journal Papers</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            IST Lab에서 발표한 학술지 논문들을 소개합니다.
          </p>
        </div>

        <div className="space-y-8">
          {journalPapers.map((paper) => (
            <div key={paper.id} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium mr-3 ${getTypeColor(paper.type)}`}>
                    {paper.type}
                  </span>
                  <span className="text-sm text-gray-500">{paper.year}</span>
                </div>
                <FileText className="w-6 h-6 text-blue-700" />
              </div>

              <h3 className="text-2xl font-bold text-blue-700 mb-4">{paper.title}</h3>
              
              <div className="space-y-3 mb-6">
                <p className="text-gray-700">
                  <strong>저자:</strong> {paper.authors}
                </p>
                <p className="text-gray-700">
                  <strong>게재지:</strong> {paper.venue}, {paper.volume}, {paper.pages}
                </p>
                <p className="text-gray-700">
                  <strong>DOI:</strong> {paper.doi}
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
                  인용하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}