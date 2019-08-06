import '~/assets/styles/components/FlipnoteThumb.scss';
import Icon from '~/components/Icon';

const FlipnoteThumb = ({ placeholder, ext, src, thumb, author, onSelect, lock }) => (
  <div className="FlipnoteThumb" onClick={(e) => { onSelect(src) }}>
    <div className="FlipnoteThumb__image" style={{ "backgroundImage": `url(${ thumb })` }}>
      { ext && (
        <span className="FlipnoteThumb__type">{ ext === "ppm" ? "DSi" : "3DS" }</span>
      )}
      { placeholder && (
        <div className="FlipnoteThumb__placeholder">
          <Icon icon="loader" spin={ true }/>
        </div>
      )}
    </div>
    <div className="FlipnoteThumb__info">
      <span className="FlipnoteThumb__author">{ author }</span>
    </div>
  </div>
)

FlipnoteThumb.defaultProps = {
  onSelect: function(){},
  placeholder: false,
  ext: "",
  lock: false,
  src: "",
  thumb: "",
  author: ""
}

export default FlipnoteThumb;

