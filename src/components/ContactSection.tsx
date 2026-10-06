import { useState } from "react";
import { Phone, MessageSquare, Mail, Globe, MapPin, Share2, UserPlus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const WECHAT_ID = "realhenryyue";
const SITE = "https://www.realhenryyue.com";

const copy = {
  en: {
    location: "New York Real Estate",
    overline: "Your personal contact",
    role: "Licensed Real Estate Salesperson",
    call: "Call Henry",
    text: "Send a text",
    foot: "Flushing · New York",
    connect: "Let’s connect.",
    mobile: "Mobile",
    office: "E Realty office",
    email: "Email",
    website: "Website",
    officeMap: "Office · View map",
    copyId: "Copy WeChat ID",
    copied: "Copied ✓",
    copiedMsg: "Copied. Paste realhenryyue into WeChat search.",
    copyFail: "Automatic copying is unavailable. Long-press the ID to copy it.",
    viewQr: "View WeChat QR code",
    qrHint: "In WeChat, press and hold the QR image and choose “Recognize QR code.”",
    qrFull: "Open full-size QR image",
    elsewhere: "Elsewhere online",
    tap: "Tap a platform to see more.",
    save: "Save to contacts",
    saveNote: "Keep my details one tap away.",
    saved: "Contact file downloaded. Open it to add Henry to your contacts.",
    share: "Share card",
    shared: "Card link copied. Paste it into your message.",
    fairHousing: "NYS Fair Housing Notice",
    humanRights: "NYS Human Rights Law disclosure",
  },
  zh: {
    location: "纽约房地产",
    overline: "您的专属联系人",
    role: "纽约州持牌房地产经纪人",
    call: "致电岳先生",
    text: "发送短信",
    foot: "法拉盛 · 纽约",
    connect: "保持联系。",
    mobile: "手机",
    office: "E Realty 办公室",
    email: "邮箱",
    website: "网站",
    officeMap: "办公室 · 查看地图",
    copyId: "复制微信号",
    copied: "已复制 ✓",
    copiedMsg: "已复制，请在微信搜索中粘贴 realhenryyue。",
    copyFail: "无法自动复制，请长按微信号手动复制。",
    viewQr: "查看微信二维码",
    qrHint: "在微信中长按二维码，选择“识别图中二维码”。",
    qrFull: "打开原尺寸二维码",
    elsewhere: "社交媒体",
    tap: "点击平台查看更多内容。",
    save: "保存到通讯录",
    saveNote: "一键保存我的联系方式。",
    saved: "联系人文件已下载，打开即可添加到通讯录。",
    share: "分享名片",
    shared: "名片链接已复制，可直接粘贴发送。",
    fairHousing: "纽约州公平住房声明",
    humanRights: "纽约州人权法披露",
  },
};

async function copyText(value: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {}
  const ta = document.createElement("textarea");
  ta.value = value;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch {}
  ta.remove();
  return ok;
}

export const ContactSection = () => {
  const { language } = useLanguage();
  const c = copy[language === "zh" ? "zh" : "en"];
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleCopy = async () => {
    const ok = await copyText(WECHAT_ID);
    setCopied(ok);
    setFeedback(ok ? c.copiedMsg : c.copyFail);
    if (ok) toast({ description: c.copiedMsg });
  };

  const handleShare = async () => {
    const url = `${SITE}/#contact`;
    if (navigator.share) {
      try { await navigator.share({ title: "Hongyu (Henry) Yue", url }); return; }
      catch (e) { if ((e as Error).name === "AbortError") return; }
    }
    if (await copyText(url)) toast({ description: c.shared });
  };

  const handleSave = () => {
    const lines = [
      "BEGIN:VCARD", "VERSION:3.0", "N:Yue;Hongyu (Henry);;;", "FN:Hongyu (Henry) Yue",
      "ORG:E Realty International Corp.", "TITLE:Licensed Real Estate Salesperson",
      "TEL;TYPE=CELL:+17187175210", "TEL;TYPE=WORK:+17188868110", "EMAIL;TYPE=INTERNET:realhenryyue@gmail.com",
      `URL:${SITE}`, "ADR;TYPE=WORK:;;39-07 Prince St. Suite 4D;Flushing;NY;11354;USA",
      "NOTE:WeChat ID realhenryyue", "END:VCARD",
    ];
    const blob = new Blob([lines.join("\r\n") + "\r\n"], { type: "text/vcard;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Hongyu_Henry_Yue.vcf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 3000);
    toast({ description: c.saved });
  };

  const contacts = [
    { icon: Phone, label: c.mobile, value: "718-717-5210", href: "tel:+17187175210" },
    { icon: Phone, label: c.office, value: "718-886-8110", href: "tel:+17188868110" },
    { icon: Mail, label: c.email, value: "realhenryyue@gmail.com", href: "mailto:realhenryyue@gmail.com" },
    { icon: Globe, label: c.website, value: "www.realhenryyue.com", href: SITE },
    {
      icon: MapPin, label: c.officeMap, value: "39-07 Prince St., Suite 4D\nFlushing, NY 11354",
      href: "https://www.google.com/maps/search/?api=1&query=39-07%20Prince%20St%204D%2C%20Flushing%2C%20NY%2011354",
    },
  ];

  const socials = [
    { mark: "in", name: "LinkedIn", href: "https://www.linkedin.com/in/hongyu-yue-85232191" },
    { mark: "♪", name: "TikTok", href: "https://www.tiktok.com/@realhenryyue" },
    { mark: "f", name: "Facebook", href: "https://www.facebook.com/share/1EfZ9iTfqa/" },
    { mark: "R", name: language === "zh" ? "小红书" : "RED", href: "https://xhslink.cn/m/3ZOliKbNIXx" },
  ];

  return (
    <section className="hy-card-section" aria-labelledby="hy-name">
      <style>{CSS}</style>
      <div className="hy-page">
        <header className="hy-masthead">
          <a className="hy-brand" href="https://erealtyny.com/" target="_blank" rel="noopener noreferrer">
            E Realty<span>International Corp.</span>
          </a>
          <button className="hy-share" type="button" onClick={handleShare}>
            <Share2 className="hy-icon" aria-hidden="true" />{c.share}
          </button>
        </header>

        <div className="hy-layout">
          <div className="hy-profile">
            <p className="hy-location"><MapPin className="hy-icon-sm" aria-hidden="true" />{c.location}</p>
            <div className="hy-identity">
              <div className="hy-identity-text">
                <p className="hy-overline">{c.overline}</p>
                <h2 id="hy-name" className="hy-h1" aria-label="Henry Yue">Henry<span>Yue.</span></h2>
                <p className="hy-fullname">Hongyu (Henry) Yue</p>
                <p className="hy-chinese" lang="zh-Hans">岳泓宇</p>
              </div>
              <figure className="hy-portrait-wrap">
                <img className="hy-portrait" src="/henry-card-headshot.jpg" alt="Hongyu (Henry) Yue" width={184} height={184} loading="lazy" />
              </figure>
            </div>
            <div className="hy-credentials">
              <p className="hy-role">{c.role}</p>
              <p>E Realty International Corp.</p>
            </div>
            <nav className="hy-quick" aria-label="Quick contact">
              <a className="hy-call" href="tel:+17187175210"><Phone className="hy-icon" aria-hidden="true" />{c.call}</a>
              <a href="sms:+17187175210"><MessageSquare className="hy-icon" aria-hidden="true" />{c.text}</a>
            </nav>
            <p className="hy-foot">{c.foot}</p>
          </div>

          <div className="hy-details">
            <div className="hy-section-top"><h3 className="hy-h2">{c.connect}</h3><span className="hy-index">01 / CONTACT</span></div>
            <div>
              {contacts.map((item) => (
                <a key={item.value} className="hy-contact" href={item.href}
                  {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="hy-contact-icon"><item.icon className="hy-icon" aria-hidden="true" /></span>
                  <span className="hy-contact-copy"><small>{item.label}</small><strong>{item.value}</strong></span>
                </a>
              ))}
            </div>

            <div className="hy-wechat">
              <p className="hy-wechat-heading"><MessageSquare className="hy-icon-sm" aria-hidden="true" />WeChat {language === "zh" ? "微信" : ""}</p>
              <div className="hy-wechat-row">
                <span className="hy-wechat-id">{WECHAT_ID}</span>
                <button type="button" className="hy-copy" data-copied={copied} onClick={handleCopy}>
                  {copied ? c.copied : c.copyId}
                </button>
              </div>
              {feedback && <p className="hy-feedback" role="status">{feedback}</p>}
              <details className="hy-qr">
                <summary>{c.viewQr}</summary>
                <div className="hy-qr-content">
                  <div className="hy-qr-img"><img src="/signature-wechat.png?v=2" alt="Henry Yue WeChat QR code" loading="lazy" /></div>
                  <p>{c.qrHint}</p>
                  <a className="hy-qr-full" href="/signature-wechat.png?v=2" target="_blank" rel="noopener noreferrer">{c.qrFull}</a>
                </div>
              </details>
            </div>

            <div className="hy-social-section">
              <div className="hy-section-top"><h3 className="hy-social-h">{c.elsewhere}</h3><span className="hy-index">02 / CONNECT</span></div>
              <p className="hy-hint">{c.tap}</p>
              <nav className="hy-social" aria-label="Social profiles">
                {socials.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
                    <span className="hy-mark" aria-hidden="true">{s.mark}</span><span className="hy-social-name">{s.name}</span>
                  </a>
                ))}
              </nav>
            </div>

            <button type="button" className="hy-save" onClick={handleSave}>
              <UserPlus className="hy-icon" aria-hidden="true" />{c.save}
            </button>
            <p className="hy-save-note">{c.saveNote}</p>
          </div>
        </div>

        <footer className="hy-colophon">
          <span>HONGYU (HENRY) YUE · NEW YORK</span>
          <nav className="hy-legal" aria-label="Brokerage and fair housing information">
            <a href="https://erealtyny.com/" target="_blank" rel="noopener noreferrer">E Realty International Corp.</a>
            <a href="https://dos.ny.gov/fair-housing-notice" target="_blank" rel="noopener noreferrer">{c.fairHousing}</a>
            <a href="https://dos.ny.gov/housinganti-discrimination-form-dos-2156" target="_blank" rel="noopener noreferrer">{c.humanRights}</a>
          </nav>
        </footer>
      </div>
    </section>
  );
};

const CSS = `
.hy-card-section{--ink:#142337;--paper:#faf8f3;--line:#deddd5;--muted:#636963;--green:#285c43;--serif:Georgia,'Times New Roman',serif;--sans:Arial,Helvetica,sans-serif;background:#eae9e3;padding:56px 16px;color:var(--ink);font:15px/1.5 var(--sans)}
.hy-card-section a{color:inherit;text-decoration:none}.hy-card-section p{margin:0}
.hy-icon{width:20px;height:20px;stroke-width:1.6;flex:none}.hy-icon-sm{width:14px;height:14px;flex:none}
.hy-page{max-width:1020px;margin:0 auto;background:var(--paper);box-shadow:0 18px 60px #1423370c;border:1px solid #d8d8d0}
.hy-masthead{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:22px 32px;border-bottom:1px solid var(--line)}
.hy-brand{font-size:11px;line-height:1.4;font-weight:700;letter-spacing:1.6px;text-transform:uppercase}.hy-brand span{display:block;font-size:9px;letter-spacing:2.3px;font-weight:400;margin-top:3px;color:var(--muted)}
.hy-share{display:flex;gap:8px;align-items:center;border:1px solid #d1d2c9;background:transparent;padding:8px 13px;min-height:44px;font-size:12px;border-radius:3px;color:var(--ink)}.hy-share:hover{background:#ecece4}
.hy-layout{display:grid;grid-template-columns:42% 58%}
.hy-profile{background:var(--ink);color:#fbf8ee;padding:35px 38px 34px;display:flex;flex-direction:column}
.hy-location{display:flex;align-items:center;gap:9px;color:#d4be94;font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:26px!important}
.hy-identity{display:flex;flex-direction:column-reverse;gap:28px}
.hy-portrait-wrap{width:184px;height:184px;margin:0;position:relative}.hy-portrait-wrap:after{content:'';position:absolute;inset:8px -8px -8px 8px;border:1px solid #c7ac7759;pointer-events:none}
.hy-portrait{display:block;width:100%;height:100%;object-fit:cover;position:relative;z-index:1}
.hy-overline{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#aeb8c5;margin-bottom:8px!important}
.hy-h1{font-family:var(--serif);font-weight:400;font-size:67px;line-height:.99;letter-spacing:-2.6px;margin:0;color:#fbf8ee}.hy-h1 span{display:block}
.hy-fullname{margin-top:17px!important;font-size:12px;color:#d9e0e9}.hy-chinese{margin-top:7px!important;color:#c7ac77;letter-spacing:4px;font-size:13px}
.hy-credentials{margin:28px 0 30px;padding-top:22px;border-top:1px solid #ffffff25}.hy-credentials p{font-size:12px;line-height:1.65;color:#dce0e6}.hy-credentials .hy-role{font-size:13px;font-weight:700;color:#ead7b2;margin-bottom:4px}
.hy-quick{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:auto}
.hy-quick a{display:flex;align-items:center;justify-content:center;gap:9px;min-height:48px;border:1px solid #ffffff45;font-size:12px;font-weight:700;border-radius:3px}.hy-quick a:hover{background:#ffffff18}
.hy-quick .hy-call{background:#ecdfc3;border-color:#ecdfc3;color:var(--ink)}.hy-quick .hy-call:hover{background:#f7ebd2}
.hy-foot{font-size:9px;letter-spacing:1.5px;color:#aeb8c5;margin-top:22px!important;text-transform:uppercase}
.hy-details{padding:34px 38px 26px;min-width:0}
.hy-section-top{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:19px;gap:8px}
.hy-index{font-size:10px;color:#777a6f;letter-spacing:1px}
.hy-h2{margin:0;font:400 31px/1.2 var(--serif);letter-spacing:-.65px;color:var(--ink)}
.hy-contact{display:flex;align-items:center;gap:14px;padding:13px 0;border-bottom:1px solid var(--line);min-height:66px}.hy-contact:hover{background:#f2f0e9}
.hy-contact-icon{width:32px;display:flex;justify-content:center;color:#7a694a;flex:none}
.hy-contact-copy{flex:1;min-width:0}.hy-contact-copy small{display:block;color:var(--muted);font-size:10px;letter-spacing:.5px;margin-bottom:3px}
.hy-contact-copy strong{display:block;font-size:14px;font-weight:500;overflow-wrap:anywhere;white-space:pre-line}.hy-contact:hover strong{color:#86652f}
.hy-wechat{margin-top:28px;background:#eeeee6;border:1px solid #dddfd4;padding:19px 20px 15px;border-radius:4px}
.hy-wechat-heading{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.5px;margin-bottom:10px!important;color:#4e5c4e}
.hy-wechat-row{display:flex;align-items:center;justify-content:space-between;gap:12px}
.hy-wechat-id{font-size:17px;font-weight:600;user-select:all;overflow-wrap:anywhere;min-width:0}
.hy-copy{min-height:44px;padding:8px 12px;background:var(--paper);border:1px solid #bfc5b7;border-radius:3px;font-size:11px;font-weight:700;color:var(--ink);flex:none}.hy-copy:hover{border-color:#71806b}
.hy-copy[data-copied="true"]{background:#e0efdf;border-color:#789476;color:var(--green)}
.hy-feedback{font-size:11px;margin-top:6px!important;color:#375a40}
.hy-qr{margin-top:9px;border-top:1px solid #d4d8ca;padding-top:3px}
.hy-qr summary{display:flex;align-items:center;justify-content:space-between;min-height:44px;font-size:11px;color:#4a5948;list-style:none;cursor:pointer}.hy-qr summary::-webkit-details-marker{display:none}
.hy-qr summary::after{content:'+';font-size:20px}.hy-qr[open] summary::after{content:'−'}
.hy-qr-content{text-align:center;padding:12px 0 5px}.hy-qr-img{width:212px;max-width:100%;margin:auto;background:#fff;padding:8px;border:1px solid #d5dace}.hy-qr-img img{display:block;width:100%;height:auto}
.hy-qr-content p{font-size:11px;max-width:320px;margin:12px auto 0!important;color:var(--muted);line-height:1.6}
.hy-qr-full{display:inline-block;margin-top:11px;font-size:11px;text-decoration:underline!important;text-underline-offset:4px}
.hy-social-section{margin-top:27px}.hy-social-h{margin:0;font:700 10px/1.5 var(--sans);letter-spacing:1.8px;text-transform:uppercase;color:var(--ink)}
.hy-hint{margin:-12px 0 7px!important;color:#777d75;font-size:10px}
.hy-social{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:18px}
.hy-social a{display:flex;align-items:center;gap:9px;min-height:46px;font-size:12px;border-bottom:1px solid var(--line)}.hy-social a:hover{background:#f2f0e9;color:#86652f}
.hy-mark{display:flex;align-items:center;justify-content:center;font-weight:700;width:21px;height:21px;font-size:12px}
.hy-social-name{text-decoration:underline;text-decoration-color:#bba87988;text-underline-offset:4px}
.hy-save{width:100%;display:flex;align-items:center;justify-content:center;gap:10px;min-height:48px;border:1px solid var(--ink);border-radius:3px;background:var(--ink);color:#fff;margin-top:27px;font-size:12px;font-weight:700}.hy-save:hover{background:#2b3f56}
.hy-save-note{font-size:10px;color:var(--muted);text-align:center;margin-top:9px!important}
.hy-colophon{border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;gap:15px;padding:17px 32px;font-size:9px;color:#626a64;letter-spacing:1px;flex-wrap:wrap}
.hy-legal{display:flex;gap:14px;flex-wrap:wrap;justify-content:flex-end}.hy-legal a{font-size:10px;letter-spacing:0;text-decoration:underline!important;text-underline-offset:3px}
@media(max-width:760px){.hy-card-section{padding:0;background:var(--paper)}.hy-page{border:0;box-shadow:none;max-width:540px}.hy-masthead{padding:17px 22px}
.hy-layout{grid-template-columns:1fr}.hy-profile{padding:25px 24px 23px}.hy-identity{flex-direction:row;align-items:center;justify-content:space-between;gap:20px}.hy-identity-text{flex:1;min-width:0}
.hy-portrait-wrap{width:126px;height:152px;flex:none;margin-right:8px}.hy-portrait{object-position:50% 35%}.hy-h1{font-size:clamp(44px,12vw,60px);letter-spacing:-1.8px}
.hy-foot{display:none}.hy-details{padding:29px 24px 26px}.hy-colophon{padding:17px 24px}.hy-h2{font-size:29px}}
`;
