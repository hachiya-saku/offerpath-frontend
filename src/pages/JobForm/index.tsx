import {
  ArrowLeft,
  BriefcaseBusiness,
  Link2,
  Plus,
  Save,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { recruitmentPlatforms, statuses } from "@/data/mockData";
import "./style.css";

export function JobForm() {
  const navigate = useNavigate();
  const [required, setRequired] = useState(["React", "TypeScript"]);
  const [bonus, setBonus] = useState(["Next.js"]);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    navigate("/jobs");
  };
  return (
    <form className="job-form grid gap-6" onSubmit={submit}>
      <section className="page-heading form-heading">
        <div>
          <Button
            className="back-link"
            variant="link"
            size="sm"
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            返回
          </Button>
          <p className="eyebrow">NEW OPPORTUNITY</p>
          <h2>记录新岗位</h2>
          <p>先保存核心信息，后续可以随时补充和调整。</p>
        </div>
        <div className="form-actions">
          <Button
            className="secondary-button"
            variant="outline"
            type="button"
            onClick={() => navigate("/jobs")}
          >
            取消
          </Button>
          <Button className="primary-button" type="submit">
            <Save size={17} />
            保存岗位
          </Button>
        </div>
      </section>
      <div className="form-layout">
        <div className="form-main">
          <section className="form-section">
            <div className="section-title">
              <span>
                <BriefcaseBusiness size={18} />
              </span>
              <div>
                <h3>基本信息</h3>
                <p>岗位与公司的主要识别信息</p>
              </div>
            </div>
            <div className="form-grid">
              <label>
                <span>公司名称 *</span>
                <input required placeholder="例如：株式会社サンプル" />
              </label>
              <label>
                <span>岗位名称 *</span>
                <input required placeholder="例如：Frontend Engineer" />
              </label>
              <label>
                <span>招聘平台</span>
                <select defaultValue="Green">
                  {recruitmentPlatforms.map((platform) => (
                    <option key={platform}>{platform}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>工作地点</span>
                <input placeholder="例如：东京 / Remote" />
              </label>
              <label>
                <span>最低薪资</span>
                <div className="input-suffix">
                  <input type="number" placeholder="500" />
                  <span>万円</span>
                </div>
              </label>
              <label>
                <span>最高薪资</span>
                <div className="input-suffix">
                  <input type="number" placeholder="750" />
                  <span>万円</span>
                </div>
              </label>
              <label className="full-span">
                <span>岗位链接</span>
                <div className="input-prefix">
                  <Link2 size={16} />
                  <input type="url" placeholder="https://..." />
                </div>
              </label>
            </div>
          </section>
          <section className="form-section">
            <div className="section-title">
              <span>
                <Sparkles size={18} />
              </span>
              <div>
                <h3>技能要求</h3>
                <p>用于计算与个人技术栈的匹配度</p>
              </div>
            </div>
            <TagEditor label="必须技能" tags={required} setTags={setRequired} />
            <TagEditor label="加分技能" tags={bonus} setTags={setBonus} />
          </section>
          <section className="form-section">
            <div className="section-title">
              <span>
                <Plus size={18} />
              </span>
              <div>
                <h3>备注</h3>
                <p>记录面试准备、联系人或其他信息</p>
              </div>
            </div>
            <label>
              <span className="field-label">备注内容</span>
              <textarea rows={6} placeholder="补充关于这个岗位的信息..." />
            </label>
          </section>
        </div>
        <aside className="form-aside">
          <div className="sticky-panel">
            <p className="eyebrow">TRACKING</p>
            <h3>投递状态</h3>
            <label>
              <span>当前状态</span>
              <select defaultValue="想投">
                {statuses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <div className="form-tip">
              <Sparkles size={17} />
              <p>
                <strong>匹配度将在保存后计算</strong>
                <span>系统会比较岗位技能与个人技术栈。</span>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
}

function TagEditor({
  label,
  tags,
  setTags,
}: {
  label: string;
  tags: string[];
  setTags: (tags: string[]) => void;
}) {
  const [value, setValue] = useState("");
  const add = () => {
    const next = value.trim();
    if (next && !tags.includes(next)) setTags([...tags, next]);
    setValue("");
  };
  return (
    <div className="tag-editor">
      <span className="field-label">{label}</span>
      <div className="tag-input">
        {tags.map((tag) => (
          <span className="skill-tag" key={tag}>
            {tag}
            <button
              type="button"
              onClick={() => setTags(tags.filter((item) => item !== tag))}
              aria-label={`删除 ${tag}`}
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add();
            }
          }}
          placeholder="输入技能后按 Enter"
        />
      </div>
    </div>
  );
}
