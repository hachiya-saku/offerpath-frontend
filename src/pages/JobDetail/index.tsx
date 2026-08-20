import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  MapPin,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { jobs, statuses } from "@/data/mockData";
import "./style.css";

export function JobDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const job = jobs.find((item) => item.id === Number(id)) ?? jobs[0];
  return (
    <div className="page-stack">
      <section className="detail-hero">
        <button
          className="back-link"
          type="button"
          onClick={() => navigate("/jobs")}
        >
          <ArrowLeft size={16} />
          岗位一览
        </button>
        <div className="detail-title-row">
          <span className="company-monogram large">
            {job.company.slice(0, 1)}
          </span>
          <div>
            <p>{job.company}</p>
            <h2>{job.role}</h2>
            <span>
              <MapPin size={14} />
              {job.location} · {job.platform}
            </span>
          </div>
          <div className="detail-actions">
            <button className="secondary-button" type="button">
              <Pencil size={16} />
              编辑
            </button>
            <button className="icon-button" type="button" title="更多操作">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>
        <div className="detail-meta">
          <div>
            <span>当前状态</span>
            <strong className={`status-badge status-${job.status}`}>
              {job.status}
            </strong>
          </div>
          <div>
            <span>技能匹配度</span>
            <strong className="accent-number">{job.match}%</strong>
          </div>
          <div>
            <span>薪资范围</span>
            <strong>{job.salary}</strong>
          </div>
          <div>
            <span>最后更新</span>
            <strong>{job.updatedAt}</strong>
          </div>
        </div>
      </section>
      <div className="detail-layout">
        <div className="detail-main">
          <section className="panel detail-section">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">SKILL MATCH</p>
                <h3>技能匹配分析</h3>
              </div>
              <span className="score-ring">{job.match}</span>
            </div>
            <div className="skill-group">
              <h4>必须技能</h4>
              <div>
                {job.requiredSkills.map((skill) => (
                  <span className="skill-match is-hit" key={skill}>
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="skill-group">
              <h4>加分技能</h4>
              <div>
                {job.bonusSkills.map((skill, index) => (
                  <span
                    className={`skill-match ${index === 0 ? "is-hit" : "is-missing"}`}
                    key={skill}
                  >
                    {index === 0 ? "✓" : "−"} {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
          <section className="panel detail-section">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">NOTES</p>
                <h3>岗位备注</h3>
              </div>
              <button className="text-button" type="button">
                <Pencil size={14} />
                编辑
              </button>
            </div>
            <p className="note-content">{job.note}</p>
          </section>
          <section className="panel detail-section">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">SOURCE</p>
                <h3>岗位来源</h3>
              </div>
            </div>
            <a
              className="source-link"
              href={job.url}
              target="_blank"
              rel="noreferrer"
            >
              <span>{job.url}</span>
              <ExternalLink size={16} />
            </a>
          </section>
        </div>
        <aside className="detail-aside">
          <section className="panel timeline-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">TIMELINE</p>
                <h3>状态记录</h3>
              </div>
              <CalendarDays size={18} />
            </div>
            <div className="timeline">
              {statuses
                .slice(0, 5)
                .reverse()
                .map((status, index) => (
                  <div className={index < 3 ? "is-complete" : ""} key={status}>
                    <i />
                    <p>
                      <strong>{status}</strong>
                      <span>
                        {index < 3 ? `${8 + index}月${12 + index}日` : "等待中"}
                      </span>
                    </p>
                  </div>
                ))}
            </div>
          </section>
          <button className="danger-button" type="button">
            <Trash2 size={16} />
            删除这个岗位
          </button>
        </aside>
      </div>
    </div>
  );
}
