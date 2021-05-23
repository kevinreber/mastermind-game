import ReactDOM from 'react-dom';
import './Overlay.scss';

/** Modal Component
 *
 * @param {any}         content		Content that displays inside Modal.
 * @param {function}    onDismiss  	Function that closes Modal component.
 */

const Overlay = ({ content = 'hello world', onDismiss }) => {
	return ReactDOM.createPortal(
		<div className="Overlay" onClick={onDismiss}>
			<div className="Overlay-Content" onClick={(e) => e.stopPropagation()}>
				{content}
			</div>
		</div>,
		document.getElementById('overlay')
	);
};

export default Overlay;
