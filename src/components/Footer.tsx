import Image from 'next/image';
import TerminalContainer from './TerminalContainer';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <TerminalContainer title="CONTACT_UPLINK" className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.item}>
            <span className={`${styles.label} mono`}>WECHAT_PERSONAL</span>
            <div className={styles.imageWrapper}>
                <Image 
                    src="/images/qr/wechat.jpg" 
                    alt="WeChat QR" 
                    width={150} 
                    height={150}
                    className={styles.qr}
                />
            </div>
            <p className={styles.tip}>添加请备注：来意</p>
          </div>
          
          <div className={styles.item}>
            <span className={`${styles.label} mono`}>VIDEO_CHANNEL</span>
            <div className={styles.imageWrapper}>
                <Image 
                    src="/images/qr/video.jpg" 
                    alt="Video Channel QR" 
                    width={150} 
                    height={150}
                    className={styles.qr}
                />
            </div>
            <p className={styles.tip}>关注技术视频号</p>
          </div>
        </div>
        <div className={`${styles.copyright} mono`}>
            © 2026 TANGZHANX.COM // SYSTEM_ONLINE
        </div>
      </TerminalContainer>
    </footer>
  );
}
