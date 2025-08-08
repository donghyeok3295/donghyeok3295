import { Mail, GraduationCap, Award } from "lucide-react"
import { User } from "lucide-react"

export default function ProfessorPage() {
  const professor = {
    name: "DONGWON JEONG",
    title: "Professor",
    image: "/professor.jpg",
    research: "Database, Mobility",
    email: "djeong@kunsan.ac.kr",
    homepage: "https://sites.google.com/site/withimp/home?authuser=0",
    education: [
      "Ph.D., Korea University, Seoul, Korea, 2004",
    ],
    positions: [
      "Professor, Department of Software Science & Engineering, College of Computer & Software, Kunsan National University",
      "Dean of College of Computer & Software, Kunsan National University",
      "Director of National Program of Excellence in Software"
    ],
    career: [
      "1998.10.01.~1998.12.31., 한국전자통신연구원(ETRI), 위촉연구원",
      "1999.06.01.~2000.05.31., (주)이스텝(ICU부설 한국정보통신교육원 GIS교육분원 파견), 전임강사",
      "2000.08.01.~2001.03.12., (주)지구넷 부설 연구소, 선임연구원",
      "2002.02.26.~2005.03.25., 라임미디어 테크놀로지스, 연구원",
      "2002.12.24.~2004.02.03., 한국정보통신기술협회(TTA), 데이터 연구반(SG08.02), 특별위원",
      "2004.03.01.~2005.02.28., 고려대학교 정보통신기술연구소, 연구조교수",
      "2005.01.01.~2005.03.27., Pennsylvania State University(PostDoc.), Visiting Scholar",
      "2010.03.01.~2013.12.31., 한국컴퓨터교육학회, 이사",
      "2009.01.01.~임기종료, 지식경제부 산하 기술표준원, 지리정보 전문위원회(ISO/TC 211 Mirror Committee), 전문위원",
      "2011.03.~2012.01., 군산대학교 통계컴퓨터과학과, 학과장",
      "2013.02.~2014.01., 오클랜드 대학교(Oakland University, MI), 파견 교수",
      "2014.03.01.~2018.02.28., 한국컴퓨터정보학회, 이사",
      "2015.03.01.~2018.02.28., 군산대학교, 기획부처장",
      "2009.03.12.~임기종료, 한국정보통신기술협회(TTA), NGIS 프로젝트 그룹(PG409), 특별위원",
      "2018.03.01.~2019.02.17., 군산대학교 소프트웨어융합공학과, 학과장",
      "2019.02.17.~2020.02.09., 오클랜드 대학교(Oakland University, MI), 파견 교수",
      "2020.03.01.~2021.02.28., 군산대학교 소프트웨어융합공학과, 학과장",
      "2021.04.01.~2021.11.30., 전북테크노파크, 전북디지털융합기술위원회, 위원(빅데이터 분과 위원장)",
      "2020.12.03.~2021.11.02., 제14대 군산대학교 교수평의회 의장",
      "2022.02.15.~2022.12.31., 전북테크노파크, AI 학습 데이터 구축 분과위원회, 위원장",
      "2022.01.06.~2022.12.31., 군산대학교 기획처장",
      "2021.04.07.~2022.04.06., 대통령 직속 국가균형발전위원회, 자문위원",
      "2023.03.01.~2024.02.29., 전북소프트웨어(SW)미래채움사업 총괄운영위원회, 위원",
      "2023.03.02.~2024.08.31., 군산대학교 컴퓨터소프트웨어학부, 학부장",
      "2023.MM.DD.~2025.MM.DD 군산시 정책자문단(2기) //to be",
      "2024.01.01.~2024.12.31., 전북테크노파크 ‘24년 AI 빅데이터 전문인력 양성사업, 운영위원",
      "2004.02.04.~현재, 한국정보통신기술협회(TTA), 메타데이터 프로젝트 그룹(PG606), 특별위원",
      "2006.07.01.~현재, 국가기술표준원/국립전파연구원, JTC 1/SC 32(데이터 관리 및 교환) 전문위원회(ISO/IEC JTC 1/SC 32 Mirror Committee), 전문위원 (현재 대표전문위원, 2024.05.10)",
      "2020.12.18.~현재, 국립전파연구원, 방송통신표준 전문위원회(클라우드/빅데이터), 전문위원",
      "2020.01.01.~현재, 한국정보기술학회, 부회장",
      "2022.MM.DD.~현재, 군산시 상생협의회, 위원",
      "2022.10.24.~2027.04.27, 군산시 맑은군산추진단, 위원장",
      "2023.04.28.~2025.04.27., 군산시 정보화위원회, 위원",
      "2023.06.01.~2025.05.31., 군산시체육회 스포츠공정위원회, 위원",
      "2023.05.01.~현재, 국립군산대학교 SW중심대학사업단, 총괄책임자 및 사업단장",
      "2024.01.01.~현재, 전북테크노파크 가명정보 활용 협의회, 위원",
      "2024.06.24.~2026.06.23., 전북테크노파크 디지털융합센터 운영위원회, 위원",
      "2024.09.24.~2026.09.23., 국립군산대학교 컴퓨터소프트웨어 특성화대학, 대학장",
      "2024.12.12.~2026.12.11., 군산시 행정보공개심의위원회, 위원",
      "2025.01.01.~2025.12.31., 한국정보기술학회, 학회지편집위원",
      "2025.03.19.~2027.03.18., 군산시 정책자문단(3기), 자문위원",
      "2025.05.20.~2027.05.19., 남원시 소프트웨어(SW) 과업심의위원회, 위원",
      "2005.03.28.~현재, 국립군산대학교, 교수"
    ],
    awards: [
      "(2010) 간접비 조성 우수연구자상, 국립군산대학교, 2010.",
      "(2015) 한국정보과학회 논문공헌상, KIISE, 2015.06.25.",
      "(2015) Certificate of appreciation, ISO/IEC, 2015.11. (Project Editor for the development of International Standard, ISO/IEC TR 20943-6:2013, Information technology -- Procedures for achieving metadata registry content consistency -- Part 6: Framework for generating ontologies).",
      "(2015) 2025년 우수직원 표창, 2025.12.31. (구조개혁 1주기 교육부 평가 최우수 대학 선정 기여).",
      "(2018) 올해의 공대인상(업적평가부분), 국립군산대학교 산학융합공과대학, 2018.",
      "(2019) 우수연구자상 , KIIT, 2019.06.",
      "(2020) The 3rd Journal of Information Processing System Awards, KIPS, 2020.07.17.",
      "(2021) 제31회 과학기술우수논문상, 한국과학기술단체총엽합회, 2021.09.10.",
      "(2023) 대학발전 유공자 표창, 국립군산대학교, 2023.",
      "(2024) 황룡상(대학혁신부분), 국립군산대학교, 2024.02.29.",
      "(2024) 과학기술정보통신부 장관상(인재양성분야), 과학기술정보통신부, 2024.12.18.",
      "(2025) 대통령 표창, 2025년 정보통신 유공 정부포상, 2025.04.21."
    ],
    interests: [
      "Database",
      "Semantic Services",
      "Big Data",
      "Internet of Things",
      "Edge Computing",
      "Intelligent Converged Services"
    ]
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Professor</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-7xl w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: Photo and Basic Info */}
<div className="text-center">
  <div className="w-85 h-70 mx-auto mb-6 bg-gray-200 flex items-center justify-center overflow-hidden">
    <img
      src={professor.image}
      alt={professor.name}
      className="w-full h-full object-cover"
    />
  </div>
  <h4 className="text-3xl font-bold text-gray-800 mb-4">{professor.name}</h4>
  <div className="space-y-4 text-lg text-gray-600">
    <div className="flex items-center justify-center">
      <Mail className="w-6 h-6 mr-3" />
      <span>{professor.email}</span>
    </div>
    <div className="flex items-center justify-center mt-2">
      <a
        href={professor.homepage}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 underline text-sm"
      >
        Homepage
      </a>
    </div>
  </div>
</div>

              {/* Right: Detailed Information */}
              <div className="space-y-8">
                {/* Education */}
                <div>
                  <h5 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
                    <GraduationCap className="w-6 h-6 mr-3" />
                    Education
                  </h5>
                  <div className="space-y-2">
                    {professor.education.map((edu, index) => (
                      <p key={index} className="text-gray-700 text-lg">{edu}</p>
                    ))}
                  </div>
                </div>

                {/* Career */}
                <div>
                  <h5 className="text-2xl font-bold text-blue-700 mb-4">Personal History</h5>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {professor.career.map((career, index) => (
                      <p key={index} className="text-gray-700 text-base">{career}</p>
                    ))}
                  </div>
                </div>

                {/* Awards */}
                <div>
                  <h5 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
                    <Award className="w-6 h-6 mr-3" />
                    Awards / Certificate of Appreciation
                  </h5>
                  <div className="space-y-2">
                    {professor.awards.map((award, index) => (
                      <p key={index} className="text-gray-700 text-base">{award}</p>
                    ))}
                  </div>
                </div>

                {/* Research Interests */}
                <div>
                  <h5 className="text-2xl font-bold text-blue-700 mb-4">Research Interests</h5>
                  <div className="grid grid-cols-1 gap-2">
                    {professor.interests.map((interest, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-700 rounded-full mr-3"></div>
                        <p className="text-gray-700 text-lg">{interest}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}