import '../assets/styles/components/FlipnoteThumb.scss';

const FlipnoteThumb = (props) => (
  <li className="FlipnoteThumb" onClick={(e) => { props.onSelect(props.src) }}>
    <div className="FlipnoteThumb__image" style={{ "backgroundImage": `url(${ props.thumb })` }}>
      {props.ext &&
        <span className="FlipnoteThumb__type">{ props.ext == "ppm" ? "DSi" : "3DS" }</span>
      }
    </div>
    <div className="FlipnoteThumb__info">
      <span className="FlipnoteThumb__author">{ props.author }</span>
    </div>
  </li>
)

FlipnoteThumb.defaultProps = {
  onSelect: function(){},
  src: null,
  thumb: "",
  author: ""
}

export default FlipnoteThumb;

