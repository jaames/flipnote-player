import '@/styles/components/Footer.scss';

export default (props) => (
  <footer className="Footer">
    <div className="Footer__left">
      <p>
        Created by <a href="https://jamesdaniel.dev">James Daniel</a> (Source code on <a href="https://github.com/jaames/flipnote-player">GitHub</a>)
      </p>
      <p>
        Updates coming soon - stay tuned!
        <span className="Footer__socials">
          <a href="https://bsky.app/profile/jaames.co.uk">Bluesky</a>
          <a href="https://x.com/jaamesd_">Twitter</a>
          <a href="https://github.com/jaames">GitHub</a>
        </span>
      </p>
    </div>
    <div className="Footer__right">
      <p>
        Flipnote&nbsp;Studio and Flipnote&nbsp;Studio&nbsp;3D are trademarks of Nintendo.
        This project is not affiliated with them.
      </p>
    </div>
  </footer>
);