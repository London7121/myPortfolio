import { Tabs, Card, Tag, Typography, Row, Col } from "antd";
import { useState } from "react";
import { motion } from "framer-motion";
import { categories, projects } from "../../../constants/projectsData";
import { useTranslation } from "react-i18next";

const { Title, Text, Paragraph } = Typography;

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState("All");

  console.log(i18n.language)

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div style={{ padding: 24, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* HEADER */}
        <Title level={2} style={{ marginBottom: 20 }}>
          {t("projects")}
        </Title>

        {/* TABS */}
        <Tabs
          activeKey={active}
          onChange={(key) => setActive(key)}
          items={categories.map((c) => ({
            key: c,
            label: <Text>{c}</Text>,
          }))}
          style={{ marginBottom: 24 }}
        />

        {/* GRID */}
        <Row gutter={[16, 16]}>
          {filtered.map((project, i) => (
            <Col key={project.id} xs={24} sm={12} lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  hoverable
                  cover={
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        height: 180,
                        objectFit: "cover",
                      }}
                    />
                  }
                >
                  {/* TITLE */}
                  <Title level={4} style={{ marginBottom: 6 }}>
                    {project.title}
                  </Title>

                  {/* DESCRIPTION */}
                  <Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                    {project.description}
                  </Paragraph>

                  {/* TAGS */}
                  <div style={{ marginTop: 10 }}>
                    {project.tags.map((tag) => (
                      <Tag key={tag} color="blue" style={{ margin: 5 }}>
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { categories, projects } from "../../../constants/projectsData";
// import "./project.css";

// // "Web" dan boshqa barcha kategoriyalar disabled
// const ENABLED_CATEGORY = "Web";

// export default function Projects() {
//   const [active, setActive] = useState(ENABLED_CATEGORY);

//   const filtered =
//     active === "All"
//       ? projects
//       : projects.filter((p) => p.category === active);

//   return (
//     <div className="projects-page">

//       <div className="projects-inner">

//         {/* Header */}
//         <div className="hdr-anim">
//           <p className="page-label">Portfolio</p>
//           <h1 className="page-title">Mening <span>loyihalarim</span></h1>
//         </div>

//         {/* Filter bar */}
//         <div className="filter-bar bar-anim">
//           {categories.map((cat) => {
//             const isDisabled = cat !== ENABLED_CATEGORY;
//             const isActive = active === cat;
//             const count = cat === "All"
//               ? projects.length
//               : projects.filter((p) => p.category === cat).length;

//             return (
//               <button
//                 key={cat}
//                 className={`filter-btn ${
//                   isDisabled
//                     ? "disabled"
//                     : isActive
//                     ? "active"
//                     : "inactive-enabled"
//                 }`}
//                 onClick={() => !isDisabled && setActive(cat)}
//                 disabled={isDisabled}
//                 title={isDisabled ? "Tez kunda..." : undefined}
//               >
//                 {cat}
//                 {isDisabled && <span className="disabled-pill">soon</span>}
//                 {!isDisabled && (
//                   <span className="filter-count">{count}</span>
//                 )}
//               </button>
//             );
//           })}
//         </div>

//         {/* Grid */}
//         <div className="projects-grid">
//           <AnimatePresence mode="popLayout">
//             {filtered.length === 0 ? (
//               <div className="empty-state">
//                 <div className="empty-icon">📂</div>
//                 <p>Hozircha loyihalar yo'q</p>
//               </div>
//             ) : (
//               filtered.map((project, i) => (
//                 <motion.div
//                   key={project.id}
//                   layout
//                   initial={{ opacity: 0, y: 24, scale: 0.97 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: -12, scale: 0.96 }}
//                   transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
//                 >
//                   <div className="proj-card">
//                     {/* Image */}
//                     <div className="proj-img-wrap">
//                       {project.image ? (
//                         <img src={project.image} alt={project.title} />
//                       ) : (
//                         <div style={{
//                           width: "100%", height: "100%",
//                           display: "flex", alignItems: "center",
//                           justifyContent: "center", fontSize: "48px",
//                           background: "linear-gradient(135deg,#161d2a,#0d1117)"
//                         }}>💻</div>
//                       )}
//                       <div className="proj-img-overlay" />

//                       {/* Hover links */}
//                       <div className="proj-links">
//                         {project?.liveUrl && (
//                           <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
//                             className="link-btn" title="Live demo">
//                             <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//                               <path d="M2 12L12 2M12 2H7M12 2V7"
//                                 stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//                             </svg>
//                           </a>
//                         )}
//                         {project?.githubUrl && (
//                           <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
//                             className="link-btn" title="GitHub">
//                             <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//                               <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
//                             </svg>
//                           </a>
//                         )}
//                       </div>
//                     </div>

//                     {/* Body */}
//                     <div className="proj-body">
//                       <div className="proj-cat-badge">
//                         <span className="proj-cat-dot" />
//                         {project.category}
//                       </div>
//                       <h3 className="proj-title">{project.title}</h3>
//                       <p className="proj-desc">{project.description}</p>
//                       <div className="proj-tags">
//                         {project.tags?.map((tag: string) => (
//                           <span key={tag} className="proj-tag">{tag}</span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))
//             )}
//           </AnimatePresence>
//         </div>

//       </div>
//     </div>
//   );
// }
