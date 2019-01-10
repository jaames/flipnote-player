import '~/assets/styles/components/FlipnoteThumb.scss';

const FlipnoteThumb = ({ filestem, ext, src, thumb, author, onSelect }) => (
  <div className="FlipnoteThumb" onClick={(e) => { onSelect(src) }}>
    <div className="FlipnoteThumb__image" style={{ "backgroundImage": `url(${ thumb })` }}>
      {ext &&
        <span className="FlipnoteThumb__type">{ ext == "ppm" ? "DSi" : "3DS" }</span>
      }
    </div>
    <div className="FlipnoteThumb__info">
      <span className="FlipnoteThumb__author">{ author }</span>
    </div>
  </div>
)

FlipnoteThumb.defaultProps = {
  onSelect: function(){},
  filestem: null,
  ext: "",
  src: "",
  thumb: "",
  author: ""
}

export default FlipnoteThumb;

