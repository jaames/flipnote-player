const FlipnoteThumb = (props) => (
  <li className="FlipnoteThumb" onClick={(e) => { props.onSelect(props.src) }}>
    <div className="FlipnoteThumb__image" style={{ "background-image": `url(${ props.thumb })` }}>
      {!props.src &&
        <div className="FlipnoteThumb__loader">
          {/* <Icon icon="loader"/> */}
        </div>
      }
      {props.ext &&
        <span className="FlipnoteThumb__type">{ props.ext == "ppm" ? "DSi" : "3DS" }</span>
      }
    </div>
    <div className="FlipnoteThumb__info">
      <span className="FlipnoteThumb__author">{ props.author }</span>
    </div>
    <style jsx>{`
      .FlipnoteThumb {
        padding: 8px;
        position: relative;
      }

      .FlipnoteThumb__image {
        cursor: pointer;  
        background-repeat: no-repeat;
        background-size: 100%;
        // preserve aspect ratio (4:3)
        padding-bottom: 75%;
        overflow: hidden;
        width: 100%;
      }
    `}</style>
  </li>
)

FlipnoteThumb.defaultProps = {
  onSelect: function(){},
  src: null,
  thumb: "",
  author: ""
}

export default FlipnoteThumb;

