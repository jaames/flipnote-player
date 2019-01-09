import '~/assets/styles/components/FlipnoteThumb.scss';

const FlipnoteThumb = ({ filestem, ext, thumb, author, onSelect }) => (
  <li className="FlipnoteThumb" onClick={(e) => { onSelect(`${ext}/${filestem}.${ext}`) }}>
    <div className="FlipnoteThumb__image" style={{ "backgroundImage": `url(${ thumb })` }}>
      {ext &&
        <span className="FlipnoteThumb__type">{ ext == "ppm" ? "DSi" : "3DS" }</span>
      }
    </div>
    <div className="FlipnoteThumb__info">
      <span className="FlipnoteThumb__author">{ author }</span>
    </div>
  </li>
)

FlipnoteThumb.defaultProps = {
  onSelect: function(){},
  filestem: null,
  ext: "",
  thumb: "",
  author: ""
}

export default FlipnoteThumb;

