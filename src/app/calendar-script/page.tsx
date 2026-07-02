import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, CalendarPlus, Terminal } from 'lucide-react';
import TerminalContainer from '@/components/TerminalContainer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '日历脚本 | Tang Zhan',
  description: '把目标感直播日程一键添加到 Mac 日历的 Bash 脚本。',
  alternates: {
    canonical: '/calendar-script',
  },
};

const calendarScript = String.raw`cat > target-live-calendar.ics <<'EOF'
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tangzhan//Goal Live Calendar//CN
CALSCALE:GREGORIAN
METHOD:PUBLISH

BEGIN:VEVENT
UID:goal-live-1-20260701@tangzhan
DTSTAMP:20260702T000000Z
DTSTART;TZID=Asia/Shanghai:20260701T200000
DTEND;TZID=Asia/Shanghai:20260701T220000
SUMMARY:直播1《目标感，我人生的方向》
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:直播1《目标感，我人生的方向》明天开始
END:VALARM
BEGIN:VALARM
TRIGGER:-PT1H
ACTION:DISPLAY
DESCRIPTION:直播1《目标感，我人生的方向》1小时后开始
END:VALARM
END:VEVENT

BEGIN:VEVENT
UID:goal-live-2-20260708@tangzhan
DTSTAMP:20260702T000000Z
DTSTART;TZID=Asia/Shanghai:20260708T200000
DTEND;TZID=Asia/Shanghai:20260708T220000
SUMMARY:直播2《目标感，我的系统性思考》
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:直播2《目标感，我的系统性思考》明天开始
END:VALARM
BEGIN:VALARM
TRIGGER:-PT1H
ACTION:DISPLAY
DESCRIPTION:直播2《目标感，我的系统性思考》1小时后开始
END:VALARM
END:VEVENT

BEGIN:VEVENT
UID:goal-live-3-20260714@tangzhan
DTSTAMP:20260702T000000Z
DTSTART;TZID=Asia/Shanghai:20260714T200000
DTEND;TZID=Asia/Shanghai:20260714T220000
SUMMARY:直播3《目标感，工具与实践》
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:直播3《目标感，工具与实践》明天开始
END:VALARM
BEGIN:VALARM
TRIGGER:-PT1H
ACTION:DISPLAY
DESCRIPTION:直播3《目标感，工具与实践》1小时后开始
END:VALARM
END:VEVENT

BEGIN:VEVENT
UID:goal-live-4-20260722@tangzhan
DTSTAMP:20260702T000000Z
DTSTART;TZID=Asia/Shanghai:20260722T200000
DTEND;TZID=Asia/Shanghai:20260722T220000
SUMMARY:直播4《目标感，回顾与答疑》
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:直播4《目标感，回顾与答疑》明天开始
END:VALARM
BEGIN:VALARM
TRIGGER:-PT1H
ACTION:DISPLAY
DESCRIPTION:直播4《目标感，回顾与答疑》1小时后开始
END:VALARM
END:VEVENT

END:VCALENDAR
EOF

open target-live-calendar.ics`;

export default function CalendarScriptPage() {
  return (
    <div className="container">
      <main className={styles.page}>
        <Link href="/" className={`${styles.backLink} mono`}>
          <ArrowLeft size={16} aria-hidden="true" />
          BACK_HOME
        </Link>

        <section className={styles.hero}>
          <div className={styles.kicker}>
            <CalendarPlus size={18} aria-hidden="true" />
            <span className="mono">MAC_CALENDAR_IMPORT</span>
          </div>
          <h1>目标感直播日历脚本</h1>
          <p>
            复制下面的 Bash 脚本，在 Mac 终端执行后，会生成一个 .ics 日历文件并自动打开日历导入窗口。
            日程默认使用 2026 年、北京时间 20:00-22:00，并包含提前 1 天和提前 1 小时提醒。
          </p>
        </section>

        <TerminalContainer title="TARGET_LIVE_CALENDAR.SH" glow>
          <div className={styles.commandHeader}>
            <div>
              <span className={`${styles.commandLabel} mono`}>RUN_ON_MAC_TERMINAL</span>
              <p>导入前可以直接修改日期、开始时间和结束时间。</p>
            </div>
            <Terminal size={22} aria-hidden="true" />
          </div>
          <pre className={styles.codeBlock}>
            <code>{calendarScript}</code>
          </pre>
        </TerminalContainer>
      </main>
    </div>
  );
}
